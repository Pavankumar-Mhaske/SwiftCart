import React from "react";
import authReducer from "../features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
  },
});
