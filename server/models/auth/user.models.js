import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose, { Schema, model } from "mongoose";
import {
  AvailableSocialLogins,
  AvailableUserRoles,
  USER_TEMPORARY_TOKEN_EXPIRY,
  UserLoginType,
  UserRolesEnum,
} from "../../constants.js";

import { Address } from "../ecommerce/address.models.js";
import { Cart } from "../ecommerce/cart.models.js";
import { EcomProfile } from "../ecommerce/profile.models.js";
import { Product } from "../ecommerce/product.models.js";

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://via.placeholder.com/200x200.png`,
        localPath: "",
      },
    },
    firstname: {
      type: String,
      required: true,
      index: true,
    },
    lastname: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
      type: String,
      enum: AvailableUserRoles,
      default: UserRolesEnum.USER,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    loginType: {
      type: String,
      enum: AvailableSocialLogins,
      default: UserLoginType.EMAIL_PASSWORD,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      maxlength: [20, "Contact number can not be more than 20 digits"],
      trim: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      default: null,
    },
    // wishlist: is array of product ids
    wishlist: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
    },
    // address: is array of address ids
    address: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Address",
        },
      ],
      default: [],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    // TODO:  added later 👋🏻👋🏻 Remove this line if not needed
    accessToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.post("save", async function (user, next) {
  // ! Generally, querying data on every user save is not a good idea and not necessary when you are working on a specific application which has concrete models which are tightly coupled
  // ! However, in this application this user model is being referenced in many loosely coupled models so we need to do some initial setups before proceeding to make sure the data consistency and integrity
  const ecomProfile = await EcomProfile.findOne({ owner: user._id });
  // const socialProfile = await SocialProfile.findOne({ owner: user._id });
  const cart = await Cart.findOne({ owner: user._id });

  // Setup necessary ecommerce models for the user
  if (!ecomProfile) {
    await EcomProfile.create({
      owner: user._id,
    });
  }
  if (!cart) {
    const newCart = await Cart.create({
      owner: user._id,
      items: [],
    });

    // const myUser = await User.findById(newCart.owner);
    // myUser.cart = newCart._id || cart._id;
    // await myUser.save();

    user.cart = newCart._id || cart._id;
    await user.save();
  }

  // Setup necessary social media models for the user
  // if (!socialProfile) {
  //   await SocialProfile.create({
  //     owner: user._id,
  //   });
  // }
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

/**
 * @description Method responsible for generating tokens for email verification, password reset etc.
 */
userSchema.methods.generateTemporaryToken = function () {
  // This token should be client facing
  // for example: for email verification unHashedToken should go into the user's mail
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  // This should stay in the DB to compare at the time of verification
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  // this.forgotPasswordToken = hashedToken;

  // This is the expiry time for the token (20 minutes)
  const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;
  // this.forgotPasswordExpiry = tokenExpiry;
  return { unHashedToken, hashedToken, tokenExpiry };
};

//  Registration of the User Model(userShema) with name 'User'
export const User = model("User", userSchema);
