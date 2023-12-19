import crypto from "crypto";
import { User } from "../../models/auth/user.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UserRolesEnum } from "../../constants.js";
import { sendEmail, forgotPasswordMailgenContent } from "../../utils/mail.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // attach refresh token to the user document to avoid refreshing the access token with multiple refresh tokens
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating the access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, password, mobile, role } = req.body;

    const existedUser = await User.findOne({
      $or: [{ mobile }, { email }],
    });

    if (existedUser) {
      throw new ApiError(409, "User with email or mobile already exists", []);
    }

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      mobile,
      role: role || UserRolesEnum.USER,
    });

    /**
     * unHashedToken: unHashed token is something we will send to the user's mail
     * hashedToken: we will keep record of hashedToken to validate the unHashedToken in verify email controller
     * tokenExpiry: Expiry to be checked before validating the incoming token
     */
    const { unHashedToken, hashedToken, tokenExpiry } =
      user.generateTemporaryToken();

    /**
     * assign hashedToken and tokenExpiry in DB till user clicks on email verification link
     * The email verification is handled by {@link verifyEmail}
     */
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;
    await user.save({ validateBeforeSave: false });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          { user: user },
          "Users registered successfully and verification email has been sent on your email."
        )
      );
  } catch (error) {
    console.log("Error in create user controller");
    console.log("ERROR: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password, mobile } = req.body;
    if (!email || !mobile) {
      throw new ApiError(400, "Please provide email or mobile");
    }
    if (!password) {
      throw new ApiError(400, "Please provide password");
    }

    const user = await User.findOne({
      $or: [{ mobile }, { email }],
    });

    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    // TODO: Add more options to make cookie more secure and reliable
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
    console.log("accessToken: ", accessToken);
    console.log("refreshToken: ", refreshToken);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options) // set the access token in the cookie
      .cookie("refreshToken", refreshToken, options) // set the refresh token in the cookie
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser }, // send access and refresh token in response if client decides to save them by themselves
          "User logged in successfully"
        )
      );
  } catch (error) {
    console.log("Error in login user controller");
    console.log("ERROR: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  try {
    const { email, password, mobile = "1234567890" } = req.body;
    console.log("req.body: ", req.body);

    if (!email || !mobile) {
      throw new ApiError(400, "Please provide email or mobile");
    }
    if (!password) {
      throw new ApiError(400, "Please provide password");
    }

    const user = await User.findOne({
      $or: [{ mobile }, { email }],
    });

    if (!user) {
      throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid user credentials");
    }

    if (user.role !== UserRolesEnum.ADMIN) {
      throw new ApiError(401, "You are not authorized to login as admin");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
    );

    // TODO: Add more options to make cookie more secure and reliable
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
    console.log("accessToken: ", accessToken);
    console.log("refreshToken: ", refreshToken);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options) // set the access token in the cookie
      .cookie("refreshToken", refreshToken, options) // set the refresh token in the cookie
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser }, // send access and refresh token in response if client decides to save them by themselves
          "User logged in successfully"
        )
      );
  } catch (error) {
    console.log("Error in login user controller");
    console.log("ERROR: ", error);
    res.status(500).json({
      success: false,
      message: `Internal Server Error - ${error}}`,
      error: error,
    });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          refreshToken: undefined,
        },
      },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged out"));
  } catch (error) {
    console.log("Error in logout user controller");
    console.log("ERROR: ", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  if (!users) {
    throw new ApiError(404, "No users found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { users: users }, "Users fetched Successfully!")
    );
});

const getAUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  // console.log(req.user);
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No user found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { user: user }, "User fetched Successfully!"));
});

const deleteAUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findByIdAndDelete(userId.trim());

  if (!user) {
    throw new ApiError(404, "No user found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { user: user }, "User deleted Successfully!"));
});

const updateAUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId.trim());

  if (!user) {
    throw new ApiError(404, "No user found");
  }

  const { firstname, lastname, email, password, mobile, cart } = req.body;

  // const updatedUser = await User.findByIdAndUpdate(
  //   userId.trim(),
  //   {
  //     firstname,
  //     lastname,
  //     email,
  //     password,
  //     mobile,
  //   },
  //   { new: true }
  // );

  if (firstname) user.firstname = firstname;
  if (lastname) user.lastname = lastname;
  if (email) user.email = email;
  if (password) user.password = password;
  if (mobile) user.mobile = mobile;
  if (cart) user.cart = cart;

  await user.save();

  // const updatedUser = user.populate("cart");
  return res
    .status(200)
    .json(new ApiResponse(200, { user: user }, "User updated Successfully!"));
});

const blockUnblockUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findById(userId.trim());

  if (!user) {
    throw new ApiError(404, "No user found");
  }

  // if user is blocked then unblock it and vice versa
  user.isBlocked = user.isBlocked ? false : true;

  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: user },
        `User ${user.isBlocked ? "Blocked" : "Unblocked"} Successfully!`
      )
    );
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Get email from the client and check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exists", []);
  }

  // Generate a temporary token
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken(); // generate password reset creds

  // save the hashed version a of the token and expiry in the DB
  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  await user.save({ validateBeforeSave: false });

  // Send mail with the password reset link. It should be the link of the frontend url with token
  await sendEmail({
    email: user?.email,
    subject: "Password reset request",
    mailgenContent: forgotPasswordMailgenContent(
      user.username,
      // ! NOTE: Following link should be the link of the frontend page responsible to request password reset
      // ! Frontend will send the below token with the new password in the request body to the backend reset password endpoint
      // * Ideally take the url from the .env file which should be teh url of the frontend
      `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/reset-password/${unHashedToken}`
      // `http://localhost:8080/api/v1/users/reset-password/${unHashedToken}`
    ),
  });
  // console.log("protocol", req.protocol);
  // console.log("host", req.get("host"));
  console.log("Mail sent successfully:", unHashedToken);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset mail has been sent on your mail id"
      )
    );
});

const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  // Create a hash of the incoming reset token

  let hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // See if user with hash similar to resetToken exists
  // If yes then check if token expiry is greater than current date

  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  // If either of the one is false that means the token is invalid or expired
  if (!user) {
    throw new ApiError(489, "Token is invalid or expired");
  }

  // if everything is ok and token id valid
  // reset the forgot password token and expiry
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  // Set the provided password as the new password
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});

// get the user wishlist
const getUserWishlist = asyncHandler(async (req, res) => {
  try {
    // const {_id } = req.user;
    const userId = req.user._id;

    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      throw new ApiError(404, "No user found");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { wishlist: user.wishlist },
          "User wishlist fetched Successfully!"
        )
      );
  } catch (error) {
    console.log("Error in get user wishlist controller");
    console.log("ERROR: ", error);
    res.status(500).json({
      success: false,
      message: `Internal Server Error-${error}`,
      error: error,
    });
  }
});

// get the all user address
const getUserAddress = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).populate("address");
    if (!user) {
      throw new ApiError(404, "No user found");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { address: user.address },
          "User address fetched Successfully!"
        )
      );
  } catch (error) {
    console.log("Error in get user address controller");
    console.log("ERROR: ", error);
    res.status(500).json({
      success: false,
      message: `Internal Server Error-${error}`,
      error: error,
    });
  }
});

// get user cart
const getUserCart = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).populate("cart");
    if (!user) {
      throw new ApiError(404, "No user found");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { cart: user.cart },
          "User cart fetched Successfully!"
        )
      );
  } catch (error) {
    console.log("Error in get user cart controller");
    console.log("ERROR: ", error);
    res.status(500).json({
      success: false,
      message: `Internal Server Error-${error}`,
      error: error,
    });
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
  blockUnblockUser,
  forgotPasswordRequest,
  resetForgottenPassword,
  loginAdmin,
  getUserWishlist,
  getUserAddress,
  getUserCart,
};
