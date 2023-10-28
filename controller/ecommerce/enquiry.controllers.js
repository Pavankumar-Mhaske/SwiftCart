import { Enquiry } from "../../models/ecommerce/enquiry.models.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { getMongoosePaginationOptions } from "../../utils/helpers.js";

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    const { name, email, mobile, comment } = req.body;
    const enquiry = await Enquiry.create({
      name,
      email,
      mobile,
      comment,
      owner: req.user._id,
    });
    if (!enquiry) {
      throw new ApiError(400, "Enquiry could not be created");
    }
    return res
      .status(201)
      .json(new ApiResponse(200, enquiry, "Enquiry created successfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiResponse(500, error, "Internal Server Error"));
  }
});

const getAllEnquirys = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  // $match operation is using an empty object {} as the condition, which means that it will match all documents in the Enquiry collection.
  const enquiryAggregate = Enquiry.aggregate([{ $match: {} }]);

  const enquirys = await Enquiry.aggregatePaginate(
    enquiryAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalEnquirys",
        docs: "enquirys",
      },
    })
  );
  return res
    .status(200)
    .json(new ApiResponse(200, enquirys, "Categories fetched successfully"));
});

const getEnquiryById = asyncHandler(async (req, res) => {
  const { enquiryId } = req.params;
  const enquiry = await Enquiry.findById(enquiryId);
  // const enquiry = await Enquiry.findById(enquiryId).populate("owner");
  if (!enquiry) {
    throw new ApiError(404, "Enquiry does not exist");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, enquiry, "Enquiry fetched successfully"));
});

const updateEnquiry = asyncHandler(async (req, res) => {
  const { enquiryId } = req.params;
  //   const { name } = req.body;
  const enquiry = await Enquiry.findByIdAndUpdate(enquiryId, req.body, {
    new: true,
  });
  if (!enquiry) {
    throw new ApiError(404, "Enquiry does not exist");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, enquiry, "Enquiry updated successfully"));
});

const deleteEnquiry = asyncHandler(async (req, res) => {
  const { enquiryId } = req.params;
  const enquiry = await Enquiry.findByIdAndDelete(enquiryId);

  if (!enquiry) {
    throw new ApiError(404, "Enquiry does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { deletedEnquiry: enquiry },
        "Enquiry deleted successfully"
      )
    );
});

export {
  createEnquiry,
  getAllEnquirys,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
};
