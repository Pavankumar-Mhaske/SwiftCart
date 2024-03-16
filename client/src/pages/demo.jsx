<div>
  {description && description.length > 70 ? (
    <p dangerouslySetInnerHTML={{ __html: description.substring(0, 68) + "..." }} />
  ) : (
    <p dangerouslySetInnerHTML={{ __html: description }} />
  )}
</div>


import { Blog, BlogCategory } from "./models.js";
import asyncHandler from "express-async-handler";

const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const { page = 1, limit = 1000 } = req.query;
    
    const blogs = await Blog.aggregatePaginate(
      Blog.aggregate([
        { $match: {} },
        {
          $lookup: {
            from: "BlogCategory",
            localField: "category",
            foreignField: "_id",
            as: "categoryData",
          },
        },
        { $unwind: "$categoryData" },
        {
          $project: {
            _id: 1,
            title: 1,
            description: 1,
            categoryData: { name: 1 }, // Include only the name field from categoryData
            numberOfViews: 1,
            isLiked: 1,
            isDisliked: 1,
            likes: 1,
            dislikes: 1,
            images: 1,
            author: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]),
      {
        page,
        limit,
        customLabels: {
          totalDocs: "totalBlogs",
          docs: "blogs",
        },
      }
    );

    return res
      .status(200)
      .json({ status: 200, data: blogs, message: "Blogs fetched successfully" });
  } catch (error) {
    return res.status(400).json({ status: 400, error: error.message });
  }
});

export { getAllBlogs };
