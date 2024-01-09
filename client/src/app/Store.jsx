import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
