import React from "react";
import authReducer from "../features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: { auth: authReducer },
});
