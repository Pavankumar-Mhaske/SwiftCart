import { Blog } from "../../models/ecommerce/blog.models.js";
import { User } from "../../models/auth/user.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  getMongoosePaginationOptions,
  removeLocalFile,
} from "../../utils/helpers.js";
import {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} from "../../utils/cloudinary.js";
import { BlogCategory } from "../../models/ecommerce/blogCategory.models.js";

const createBlog = asyncHandler(async (req, res) => {
  try {
    const { title, description, category, images } = req.body;
    // const user = await User.findById(req.user._id);
    // if (!user) {
    //   throw new ApiError(404, "User not found");
    // }
    const blog = await Blog.create({
      title,
      description,
      category,
      images,
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
    /*
     const blogs = await Blog.find({});
     or
    */

    const { page = 1, limit = 1000 } = req.query;
    const queryObj = { ...req.query };
    console.log("queryObj", queryObj);

    let queryStr = JSON.stringify(queryObj);

    const blogsCriteria = JSON.parse(queryStr);
    console.log(blogsCriteria);
    // Find all categories with the given name
    if (blogsCriteria.category) {
      const categoryName = blogsCriteria.category;
      const categories = await BlogCategory.find({ name: categoryName });
      console.log("categories", categories);
      if (categories.length > 0) {
        // Extract the IDs of the matching categories
        const categoryIds = categories.map((category) => category._id);
        // Update the blogsCriteria to include the category IDs
        blogsCriteria.category = { $in: categoryIds };
      } else {
        // Handle case where category name does not exist
        return res
          .status(400)
          .json(new ApiResponse(400, null, "Category name does not exist"));
      }
    }

    // $match operation is using an empty object {} as the condition, which means that it will match all documents in the Blog collection.
    // let blogAggregate = Blog.aggregate([{ $match: {} }]);
    let blogAggregate = Blog.aggregate([{ $match: blogsCriteria }]);

    // Populate the category field
    blogAggregate = blogAggregate.lookup({
      from: "blogcategories", // name of the collection to join with
      // (for your information see in Database - how the ProductCategory model is stored as collection )
      //  in general all collection are stored in there plural form
      // for example - Product => products, ProductCategory => productcategories, etc...
      localField: "category", // field from the input documents (Product collection)
      foreignField: "_id", // field from the documents of the "from" collection (ProductCategory collection)
      as: "category", // output array field
    });

    const blogs = await Blog.aggregatePaginate(
      blogAggregate,
      getMongoosePaginationOptions({
        page,
        limit,
        customLabels: {
          totalDocs: "totalBlogs",
          docs: "blogs",
        },
      })
    );

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

const uploadImages = asyncHandler(async (req, res) => {
  try {
    // const { blogId } = req.params;
    const uploader = async (path) => await cloudinaryUploadImg(path, "Images");

    const urls = [];
    const files = req.files;
    console.log("files inside the uploadImages controller", files);
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      removeLocalFile(path);
      // fs.unlinkSync(path);
    }
    // find the product by id and update it's subImages with the urls array values...
    // const blog = await Blog.findById(blogId);
    // if (!blog) {
    //   throw new ApiError(404, "Product not found");
    // }
    // blog.images = urls;
    // await blog.save();
    const images = urls.map((url) => {
      return { url };
    });
    console.log("images", images);

    // TODO:save the images in the database
    // const product = await Product.findById(productId);
    // if (!product) {
    //   throw new ApiError(404, "Product not found");
    // }
    // product.subImages = urls;
    // await product.save();
    const newFormedImages = {
      images: images,
    };
    res
      .status(200)
      .json(
        new ApiResponse(200, newFormedImages, "Images uploaded successfully")
      );
  } catch (error) {
    throw new ApiError(400, error.message);
  }
});

// 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹
// const uploadImages = asyncHandler(async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const uploader = async (path) => await cloudinaryUploadImg(path, "Images");

//     const urls = [];
//     const files = req.files;
//     // console.log("files inside the uploadImages controller", files);
//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//       removeLocalFile(path);
//       // fs.unlinkSync(path);
//     }
//     // // find the product by id and update it's subImages with the urls array values...
//     // const product = await Product.findById(productId);
//     // if (!product) {
//     //   throw new ApiError(404, "Product not found");
//     // }
//     // product.subImages = urls;
//     // await product.save();
//     // console.log("urls", urls);

//     const images = urls.map((url) => {
//       return { url };
//     });
//     console.log("images", images);

//     // TODO:save the images in the database
//     const product = await Product.findById(productId);
//     if (!product) {
//       throw new ApiError(404, "Product not found");
//     }
//     product.subImages = urls;
//     await product.save();

//     res
//       .status(200)
//       .json(new ApiResponse(200, product, "Images uploaded successfully"));
//   } catch (error) {
//     throw new ApiError(400, error.message);
//   }
// });

// 🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹🌹

const deleteImages = asyncHandler(async (req, res) => {
  try {
    const { publicId } = req.params;
    // console.log("productId: ", productId);
    console.log("publicId: ", publicId);
    const deletedImage = await cloudinaryDeleteImg(publicId, "Images");

    console.log(deleteImages);
    // TODO: need to delete the images from the database -
    // as commited above why we need to delete the images from the database event if during uploading time we are storing urls from cludinary into in data base...?
    // answer - because we are storing the urls in the database not the images itself

    // fetch the remaining subimages from the database
    // const product = await Product.findById(productId);
    // if (!product) {
    //   throw new ApiError(404, "Product not found");
    // }
    // const remainingSubImages = product.subImages.filter(
    //   (image) => image.public_id !== publicId
    // );
    // product.subImages = remainingSubImages;
    // await product.save();

    res
      .status(200)
      .json(new ApiResponse(200, deletedImage, "Images deleted successfully"));
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
  uploadImages,
  deleteImages,
};
