import React from "react";
import authReducer from "../features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../features/customers/customerSlice";

export const store = configureStore({
  reducer: { auth: authReducer, customer: customerReducer },
});
