import mongoose, { Schema } from "mongoose";
import { User } from "../auth/user.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { BlogCategoryEnum, AvailableBlogCategories } from "../../constants.js";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
      // enum: AvailableBlogCategories,
      // default: BlogCategoryEnum.MENTAL_HEALTH,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

categorySchema.plugin(mongooseAggregatePaginate);

export const BlogCategory = mongoose.model("BlogCategory", categorySchema);
