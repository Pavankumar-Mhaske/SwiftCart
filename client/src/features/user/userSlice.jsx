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

export const removeItemFromCart = createAsyncThunk(
  "users/remove-item-from-cart",
  async (productId, thunkAPI) => {
    try {
      console.log("thunkAPI in userSlice is : ", thunkAPI);
      const response = await UserService.removeItemFromCart(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAddress = createAsyncThunk(
  "users/create-address",
  async (addressData, thunkAPI) => {
    try {
      console.log("thunkAPI in userSlice is : ", thunkAPI);
      const response = await UserService.createAddress(addressData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// get user orders
export const getUserOrders = createAsyncThunk(
  "users/get-orders",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in userSlice is : ", thunkAPI);
      const response = await UserService.getUserOrders();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// update user profile
// firstname, lastname, email, mobile, password
export const updateUserProfile = createAsyncThunk(
  "users/update-user-profile",
  async (userData, thunkAPI) => {
    try {
      console.log("thunkAPI in userSlice is : ", thunkAPI);
      const response = await UserService.updateUserProfile(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// forgotPasswordRequest
export const forgotPasswordRequest = createAsyncThunk(
  "users/forgot-password-request",
  async (email, thunkAPI) => {
    try {
      console.log("thunkAPI in userSlice is : ", thunkAPI);
      const response = await UserService.forgotPasswordRequest(email);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getUserFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const resetState = createAction("reset_all");
const initialState = {
  user: getUserFromLocalStorage,
  wishlist: [],
  cart: {},
  userCart: {},
  addresses: [],
  orders: [],
  updatedUser: {},
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
          "action.payload in userSlice is ➕➕➕ : ",
          action.payload.data
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
          "action.payload in userSlice is 😘😘 : ",
          action.payload.data.cart
        );
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.userCart = action.payload.data;
        console.log(
          "action.payload in userSlice is 👌👌 : ",
          action.payload.data
        );
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(createAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.addresses = action.payload.data.address;
        console.log(
          "action.payload in userSlice is 🌟🌟 : ",
          action.payload.data.address
        );
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload.data.orders;
        console.log(
          "action.payload in userSlice is 🥔🥔 : ",
          action.payload.data.orders
        );
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.updatedUser = action.payload.data.user;
        console.log(
          "action.payload in userSlice is 🍔🍔 : ",
          action.payload.data.user
        );
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(forgotPasswordRequest.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotPasswordRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        console.log(
          "action.payload in userSlice is 🍔🍔 : ",
          action.payload.message
        );
      })
      .addCase(forgotPasswordRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default userSlice.reducer;
