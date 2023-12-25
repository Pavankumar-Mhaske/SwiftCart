import React from "react";
import authReducer from "../features/auth/AuthSlice";
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customers/CustomerSlice";
import productReducer from "../features/product/ProductSlice";
import brandReducer from "../features/brand/BrandSlice";
import ProductCategoryReducer from "../features/product-category/ProductCategorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    productCategory: ProductCategoryReducer,
  },
});
