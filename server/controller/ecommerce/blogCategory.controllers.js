import { BlogCategory } from "../../models/ecommerce/blogCategory.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getMongoosePaginationOptions } from "../../utils/helpers.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const category = await BlogCategory.create({
      name,
      owner: req.user._id,
    });
    if (!category) {
      throw new ApiError(400, "BlogCategory could not be created");
    }
    return res
      .status(201)
      .json(
        new ApiResponse(200, category, "BlogCategory created successfully")
      );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error, "Internal Server Error"));
  }
});

const getAllCategories = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  // $match operation is using an empty object {} as the condition, which means that it will match all documents in the BlogCategory collection.
  const categoryAggregate = BlogCategory.aggregate([{ $match: {} }]);

  const categories = await BlogCategory.aggregatePaginate(
    categoryAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalCategories",
        docs: "categories",
      },
    })
  );
  return res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories fetched successfully"));
});

const getCategoryById = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await BlogCategory.findById(categoryId);
  if (!category) {
    throw new ApiError(404, "BlogCategory does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, category, "BlogCategory fetched successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  const category = await BlogCategory.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        name,
      },
    },
    { new: true }
  );
  if (!category) {
    throw new ApiError(404, "BlogCategory does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "BlogCategory updated successfully"));
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await BlogCategory.findByIdAndDelete(categoryId);

  if (!category) {
    throw new ApiError(404, "ProductCategory does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedCategory: category },
        "ProductCategory deleted successfully"
      )
    );
});

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
