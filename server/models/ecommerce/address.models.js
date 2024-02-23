import mongoose, { Schema } from "mongoose";
import { User } from "../auth/user.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const addressSchema = new Schema(
  {
    country: {
      required: true,
      type: String,
    },
    addressLine1: {
      required: true,
      type: String,
    },
    addressLine2: {
      required: true,
      type: String,
    },
    addressLine3: {
      type: String,
      default: "",
    },
    city: {
      required: true,
      type: String,
    },
    state: {
      required: true,
      type: String,
    },
    pincode: {
      required: true,
      type: String,
    },
    deliveryinfo: {
      type: String,
      default: "",
    },
    owner: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

addressSchema.plugin(mongooseAggregatePaginate);
export const Address = mongoose.model("Address", addressSchema);
