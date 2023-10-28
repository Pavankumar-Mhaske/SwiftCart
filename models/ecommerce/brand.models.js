import mongoose, { Schema } from "mongoose";
import { User } from "../auth/user.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

brandSchema.plugin(mongooseAggregatePaginate);

export const Brand = mongoose.model("Brand", brandSchema);
