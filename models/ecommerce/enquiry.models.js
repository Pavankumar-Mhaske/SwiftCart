import mongoose, { Schema, model } from "mongoose";
import { User } from "../auth/user.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import {
  EnquiryStatusEnum,
  AvailableEnquiryStatuses,
} from "../../constants.js";
const enquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // enquiry status
    status: {
      type: String,
      enum: AvailableEnquiryStatuses,
      default: EnquiryStatusEnum.SUBMITTED,
    },
  },
  { timestamps: true }
);

enquirySchema.plugin(mongooseAggregatePaginate);

export const Enquiry = model("Enquiry", enquirySchema);
