import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import productReducer from "../features/product/ProductSlice";
import userReducer from "../features/user/UserSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    user: userReducer,
  },
});
