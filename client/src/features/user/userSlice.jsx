import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import UserService from "./userService";

// getUserWishList
export const getUserWishList = createAsyncThunk(
  "users/get-wishlist",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in userSlice is : ", thunkAPI);
      const response = await UserService.getUserWishList();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//  getUserCart
export const getUserCart = createAsyncThunk(
  "users/get-cart",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in userSlice is : ", thunkAPI);
      const response = await UserService.getUserCart();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addItemOrUpdateItemQuantity = createAsyncThunk(
  "users/add-item-or-update-quantity",
  async (cartData, thunkAPI) => {
    try {
      console.log("thunkAPI in userSlice is : ", thunkAPI);
      const response = await UserService.addItemOrUpdateItemQuantity(cartData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getUserFromLocalStorage = localStorage.getItem("accessToken")
  ? JSON.parse(localStorage.getItem("accessToken"))
  : null;

export const resetState = createAction("reset_all");
const initialState = {
  user: getUserFromLocalStorage,
  wishlist: [],
  cart: {},
  userCart: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserWishList.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getUserWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.wishlist = action.payload.data.wishlist;
        console.log(
          "action.payload in userSlice is 💘💘 : ",
          action.payload.data.wishlist
        );
      })
      .addCase(getUserWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(addItemOrUpdateItemQuantity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItemOrUpdateItemQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.cart = action.payload.data;
        console.log(
          "action.payload in userSlice is 💘💘 : ",
          action.payload.data.cart
        );
      })
      .addCase(addItemOrUpdateItemQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.userCart = action.payload.data.cart;
        console.log(
          "action.payload in userSlice is 💘💘 : ",
          action.payload.data.cart
        );
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default userSlice.reducer;
