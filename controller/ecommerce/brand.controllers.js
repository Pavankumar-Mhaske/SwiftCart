import { Brand } from "../../models/ecommerce/brand.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getMongoosePaginationOptions } from "../../utils/helpers.js";

const createBrand = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Brand.create({
      name,
      owner: req.user._id,
    });
    if (!category) {
      throw new ApiError(400, "Brand could not be created");
    }
    return res
      .status(201)
      .json(new ApiResponse(200, category, "Brand created successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error, "Internal Server Error"));
  }
});

const getAllBrands = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  // $match operation is using an empty object {} as the condition, which means that it will match all documents in the Brand collection.
  const categoryAggregate = Brand.aggregate([{ $match: {} }]);

  const categories = await Brand.aggregatePaginate(
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

const getBrandById = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await Brand.findById(categoryId);
  // const category = await Brand.findById(categoryId).populate("owner");
  if (!category) {
    throw new ApiError(404, "Brand does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, category, "Brand fetched successfully"));
});

const updateBrand = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;
  const category = await Brand.findByIdAndUpdate(
    categoryId,
    {
      $set: {
        name,
      },
    },
    { new: true }
  );
  if (!category) {
    throw new ApiError(404, "Brand does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, category, "Brand updated successfully"));
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const category = await Brand.findByIdAndDelete(categoryId);

  if (!category) {
    throw new ApiError(404, "Brand does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedCategory: category },
        "Brand deleted successfully"
      )
    );
});

export { createBrand, getAllBrands, getBrandById, updateBrand, deleteBrand };
