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

//  getABlog
const getBlogById = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;

    /**
    *
      const fetchedBlog = await Blog.findById(blogId);
      if (!fetchedBlog) {
        throw new ApiError(404, "Blog not found");
      }
    // Increment the numberOfViews property
      fetchedBlog.numberOfViews += 1;

    // Save the updated document
      await fetchedBlog.save();

      or
      (because this approch makes two calls to the database which is not efficient,
        same work can be done in single call by the help of findByIdAndUpdate so we use the below approch)
     */
    const updatedViewsBlog = await Blog.findByIdAndUpdate(
      blogId,
      { $inc: { numberOfViews: 1 } }, // 👻$inc: Increment the numberOfViews property by 1
      { new: true }
    ).populate("likes dislikes");

    if (!updatedViewsBlog) {
      throw new ApiError(404, "Error in updating the views");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedViewsBlog,
          "Blog fetched and views updated successfully!"
        )
      );
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

// get all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({});

    return res
      .status(200)
      .json(new ApiResponse(200, blogs, "Blogs fetched successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

// delete blog
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    if (!deletedBlog) {
      throw new ApiError(404, "Blog not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, deletedBlog, "Blog deleted successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

// like-disLike blog
const likeDisLikeBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const userId = req.user?._id;
    console.log(userId);
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new ApiError(404, "Blog not found");
    }

    // Check if the user has already liked or disliked the blog
    const isLiked = blog.likes.includes(userId);
    const isDisliked = blog.dislikes.includes(userId);

    // Check if the user's action is a like 👍🏻 or dislike 👎🏻
    const { userAction } = req.body; // Use an action parameter in the request body

    if (userAction === "like") {
      if (isLiked) {
        // User has already liked, remove the like
        blog.likes.pull(userId);
        blog.isLiked = false;
      } else {
        // User hasn't liked, add the like and remove any previous dislike
        blog.likes.push(userId);
        blog.dislikes.pull(userId);
        blog.isLiked = true;
        blog.isDisliked = false;
      }
    } else if (userAction === "dislike") {
      if (isDisliked) {
        // User has already disliked, remove the dislike
        blog.dislikes.pull(userId);
        blog.isDisliked = false;
      } else {
        // User hasn't disliked, add the dislike and remove any previous like
        blog.dislikes.push(userId);
        blog.likes.pull(userId);
        blog.isDisliked = true;
        blog.isLiked = false;
      }
    }

    // Save the updated document
    await blog.save();

    return res
      .status(200)
      .json(new ApiResponse(200, blog, "Blog action updated successfully"));
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

export {
  createBlog,
  updateBlog,
  getBlogById,
  getAllBlogs,
  deleteBlog,
  likeDisLikeBlog,
};