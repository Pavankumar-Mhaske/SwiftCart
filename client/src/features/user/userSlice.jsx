import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import UserService from "./userService";

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

const getUserFromLocalStorage = localStorage.getItem("accessToken")
  ? JSON.parse(localStorage.getItem("accessToken"))
  : null;

export const resetState = createAction("reset_all");
const initialState = {
  user: getUserFromLocalStorage,
  wishlist: [],
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
      .addCase(resetState, () => initialState);
  },
});

export default userSlice.reducer;
