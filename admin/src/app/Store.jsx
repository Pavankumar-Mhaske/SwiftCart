import React from "react";
import authReducer from "../features/auth/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customers/CustomerSlice";
import productReducer from "../features/product/ProductSlice";
import brandReducer from "../features/brand/BrandSlice";
import productCategoryReducer from "../features/product-category/ProductCategorySlice";
import colorReducer from "../features/color/ColorSlice";
import blogReducer from "../features/blog/BlogSlice";
import blogCategoryReducer from "../features/blog-category/BlogCategorySlice";
import enquiryReducer from "../features/enquiry/EnquirySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    productCategory: productCategoryReducer,
    color: colorReducer,
    blog: blogReducer,
    blogCategory: blogCategoryReducer,
    enquiry: enquiryReducer,
  },
});
