import mongoose, { Schema, model } from "mongoose";
// import bcrypt from "bcryptjs";
import bcrypt from "bcrypt";

const userSchema = new Schema({
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
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    maxlength: [20, "Contact number can not be more than 20 digits"],
    trim: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//  Registration of the User Model(userShema) with name 'User'
export const User = model("User", userSchema);
