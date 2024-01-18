import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import productReducer from "../features/product/ProductSlice";
import userReducer from "../features/user/UserSlice";
import blogReducer from "../features/blog/BlogSlice";
import contactSlice from "../features/contact/ContactSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    user: userReducer,
    blog: blogReducer,
    contact: contactSlice,
  },
});
