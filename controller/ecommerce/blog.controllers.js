import { Blog } from "../../models/ecommerce/blog.models.js";
import { User } from "../../models/auth/user.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, description, category, image } = req.body;
    // const user = await User.findById(req.user._id);
    // if (!user) {
    //   throw new ApiError(404, "User not found");
    // }
    const blog = await Blog.create({
      title,
      description,
      category,
      image,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, blog, "Blog created successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

export { createBlog };
