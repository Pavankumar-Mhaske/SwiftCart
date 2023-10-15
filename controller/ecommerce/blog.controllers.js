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

//  Update blog
const updateBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    /**Using $set allows selective field updates without overwriting the entire document, while not using it replaces the entire document with the provided data, potentially removing fields not included. */
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedBlog) {
      throw new ApiError(404, "Blog not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, updateBlog, "Blog updated successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

export { createBlog, updateBlog };
