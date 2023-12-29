import mongoose, { Schema } from "mongoose";
import { User } from "../auth/user.models.js";
import { AvailableProductColors, ProductColorsEnum } from "../../constants.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const colorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      // enum: AvailableProductColors,
      // default: ProductColorsEnum.WHITE,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

colorSchema.plugin(mongooseAggregatePaginate);

export const Color = mongoose.model("Color", colorSchema);
