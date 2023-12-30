import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CouponService from "./CouponService";

export const getCoupons = createAsyncThunk(
  "coupons/get-coupons",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in CouponSlice is : ", thunkAPI);
      const response = await CouponService.getCoupons();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCoupon = createAsyncThunk(
  "coupons/create-coupon",
  async (coupon, thunkAPI) => {
    try {
      console.log("thunkAPI in couponSlice is : ", thunkAPI);
      console.log("coupon in couponSlice is : ", coupon);
      const response = await CouponService.createCoupon(coupon);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");
const initialState = {
  coupons: [],
  createdCoupon: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const couponSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupons.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getCoupons.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload.data.coupons;
        console.log(
          "action.payload in couponSlice is : ",
          action.payload.data.coupons
        );
      })
      // ;builder
      .addCase(getCoupons.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(createCoupon.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCoupon = action.payload.data;
        console.log(
          "action.payload in created couponSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
