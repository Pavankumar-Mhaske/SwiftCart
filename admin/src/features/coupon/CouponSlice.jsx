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

export const getACoupon = createAsyncThunk(
  "coupons/get-coupon",
  async (couponId, thunkAPI) => {
    try {
      console.log("thunkAPI in CouponSlice is : ", thunkAPI);
      const response = await CouponService.getACoupon(couponId);
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

export const updateCoupon = createAsyncThunk(
  "coupons/update-coupon",
  async (coupon, thunkAPI) => {
    try {
      console.log("thunkAPI in couponSlice is : ", thunkAPI);
      console.log("coupon in couponSlice is : ", coupon);
      const response = await CouponService.updateCoupon(coupon);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupons/delete-coupon",
  async (couponId, thunkAPI) => {
    try {
      console.log("thunkAPI in CouponSlice is : ", thunkAPI);
      const response = await CouponService.deleteCoupon(couponId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");
const initialState = {
  coupons: [],
  coupon: {},
  createdCoupon: {},
  updatedCoupon: {},
  deletedCoupon: {},
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
      // ;builder
      .addCase(getACoupon.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupon = action.payload.data;
        console.log("action.payload in couponSlice is : ", action.payload.data);
      })
      // ;builder
      .addCase(getACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(updateCoupon.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCoupon = action.payload.data;
        console.log(
          "action.payload in updated couponSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(updateCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(deleteCoupon.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCoupon = action.payload.data.deletedCoupon;
        console.log(
          "action.payload in deleted couponSlice is :💛💛 ",
          action.payload.data.deletedCoupon
        );
      })
      // ;builder
      .addCase(deleteCoupon.rejected, (state, action) => {
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
