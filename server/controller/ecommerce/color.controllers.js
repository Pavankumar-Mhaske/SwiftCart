import { Color } from "../../models/ecommerce/color.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getMongoosePaginationOptions } from "../../utils/helpers.js";

const createColor = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const color = await Color.create({
      name,
      owner: req.user._id,
    });
    if (!color) {
      throw new ApiError(400, "Color could not be created");
    }
    return res
      .status(201)
      .json(new ApiResponse(200, color, "Color created successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error, "Internal Server Error"));
  }
});

const getAllColors = asyncHandler(async (req, res) => {
  const { page = 1, limit = 1000 } = req.query;
  // $match operation is using an empty object {} as the condition, which means that it will match all documents in the Color collection.
  const colorAggregate = Color.aggregate([{ $match: {} }]);

  const colors = await Color.aggregatePaginate(
    colorAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalColors",
        docs: "colors",
      },
    })
  );
  return res
    .status(200)
    .json(new ApiResponse(200, colors, "Categories fetched successfully"));
});

const getColorById = asyncHandler(async (req, res) => {
  const { colorId } = req.params;
  const color = await Color.findById(colorId);
  // const color = await Color.findById(colorId).populate("owner");
  if (!color) {
    throw new ApiError(404, "Color does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, color, "Color fetched successfully"));
});

const updateColor = asyncHandler(async (req, res) => {
  const { colorId } = req.params;
  const { name } = req.body;
  const color = await Color.findByIdAndUpdate(
    colorId,
    {
      $set: {
        name,
      },
    },
    { new: true }
  );
  if (!color) {
    throw new ApiError(404, "Color does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, color, "Color updated successfully"));
});

const deleteColor = asyncHandler(async (req, res) => {
  const { colorId } = req.params;
  const color = await Color.findByIdAndDelete(colorId);

  if (!color) {
    throw new ApiError(404, "Color does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedColor: color },
        "Color deleted successfully"
      )
    );
});

export { createColor, getAllColors, getColorById, updateColor, deleteColor };
