import { User } from "../../models/auth/user.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { firstname, lastname, email, password, mobile } = req.body;

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
    });

    // return res.status(201).json({
    //   success: true,
    //   message: "User registered successfully",
    //   user: user,
    // });

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

  return res.status(200).json(
    new ApiResponse(
      200,
      { user: loggedInUser, accessToken, refreshToken }, // send access and refresh token in response if client decides to save them by themselves
      "User logged in successfully"
    )
  );
});

export { registerUser, loginUser };
