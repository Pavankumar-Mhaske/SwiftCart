import mongoose, { Schema } from "mongoose";
import { User } from "../auth/user.models.js";
import { ProductCategory } from "./productCategory.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

import {
  AvailableProductColors,
  ProductColorsEnum,
  AvailableProductBrands,
  ProductBrandsEnum,
} from "../../constants.js";

const productSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      required: true,
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    soldItems: {
      type: Number,
      default: 0,
      // select: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
      // required: true,
    },
    brand: {
      type: String,
      enum: AvailableProductBrands,
      default: ProductBrandsEnum.APPLE,
    },
    mainImage: {
      // required: true,
      type: {
        url: String,
        localPath: String,
      },
      default: {},
    },
    subImages: {
      type: [
        {
          url: String,
          localPath: String,
        },
      ],
      default: [],
    },
    color: {
      type: String,
      enum: AvailableProductColors,
      default: ProductColorsEnum.WHITE,
    },
    reviews: {
      type: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          rating: {
            type: Number,
            min: 1,
            max: 5,
            default: 5,
          },
          comment: String,
        },
      ],
      default: [],
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },

    owner: {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongooseAggregatePaginate);

export const Product = mongoose.model("Product", productSchema);
