import { User } from "../../models/auth/user.models.js";

const registerUser = async (req, res) => {
  const { firstname, lastname, email, password, mobile } = req.body;

  const existedUser = await User.findOne({
    $or: [{ mobile }, { email }],
  });

  if (existedUser) {
    throw new Error(409, "User with email or mobile already exists", []);
  }
  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
    mobile,
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: user,
  });
};

export { registerUser };
