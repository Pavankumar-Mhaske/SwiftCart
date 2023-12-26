import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import customerReducer from "../features/customers/CustomerSlice";
import productReducer from "../features/product/ProductSlice";
import brandReducer from "../features/brand/BrandSlice";
import productCategoryReducer from "../features/product-category/ProductCategorySlice";
import colorReducer from "../features/color/ColorSlice";
import blogReducer from "../features/blog/BlogSlice";
import blogCategoryReducer from "../features/blog-category/BlogCategorySlice";
import enquiryReducer from "../features/enquiry/EnquirySlice";
import orderReducer from "../features/order/OrderSlice";
import uploadProductImageReducer from "../features/upload-product-images/UploadSlice";

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
    order: orderReducer,
    uploadProductImage: uploadProductImageReducer,
  },
});
