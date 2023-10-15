import mongoose, { Schema, model } from "mongoose";
import { User } from "../auth/user.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      // index: true,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    numberOfViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    image: {
      type: String,
      default:
        "https://www.shutterstock.com/shutterstock/photos/1029506242/display_1500/stock-photo-blogging-blog-concepts-ideas-with-white-worktable-1029506242.jpg",
    },
    author: {
      type: String,
      default: "ADMIN",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

blogSchema.plugin(mongooseAggregatePaginate);

export const Blog = model("Blog", blogSchema);
