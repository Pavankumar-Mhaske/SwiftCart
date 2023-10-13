import { User } from "../../models/auth/user.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UserRolesEnum } from "../../constants.js";

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
    const { mobile, email, password } = req.body;

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

  const { firstname, lastname, email, password, mobile } = req.body;

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

  await user.save();

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

export {
  registerUser,
  loginUser,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
  blockUnblockUser,
};
