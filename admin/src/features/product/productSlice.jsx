import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./ProductService";

export const getProducts = createAsyncThunk(
  "products/get-products",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in productSlice is : ", thunkAPI);
      const response = await productService.getProducts();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create-product",
  async (product, thunkAPI) => {
    try {
      console.log("thunkAPI in productSlice is : ", thunkAPI);
      console.log("product in productSlice is : ", product);
      const response = await productService.createProduct(product);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  products: [],
  createdProduct: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const productSlice = createSlice({
  name: "users",
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
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProduct = action.payload;
        // state.user = action.payload.data.user;
        console.log("action.payload in userSlice is : ", action.payload);
      })
      // ;builder
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;
