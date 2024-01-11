import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductService from "./ProductService";

export const getProducts = createAsyncThunk(
  "products/get-products",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in productSlice is : ", thunkAPI);
      const response = await ProductService.getProducts();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishList = createAsyncThunk(
  "products/add-to-wishlist",
  async (productId, thunkAPI) => {
    try {
      console.log("thunkAPI in productSlice is : ", thunkAPI);
      console.log("productId in productSlice is : ", productId);
      const response = await ProductService.addToWishList(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");
const initialState = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
// variable which changes the value of the variable which is from another file by it's setter function of useState

export const ProductSlice = createSlice({
  name: "product",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload.data.products;
        console.log(
          "action.payload in productSlice is : ",
          action.payload.data.products
        );
      })
      // ;builder
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(addToWishList.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      // ;builder
      .addCase(addToWishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(resetState, () => initialState);
  },
});

export default ProductSlice.reducer;
