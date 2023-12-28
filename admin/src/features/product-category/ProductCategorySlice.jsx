import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ProductCategoryService from "./ProductCategoyService";

export const getProductCategories = createAsyncThunk(
  "product-categories/get-product-categories",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in ProductCategorySlice is : ", thunkAPI);
      const response = await ProductCategoryService.getProductCategories();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProductCategory = createAsyncThunk(
  "productCategorys/create-productCategory",
  async (productCategory, thunkAPI) => {
    try {
      console.log("thunkAPI in productCategorySlice is : ", thunkAPI);
      console.log(
        "productCategory in productCategorySlice is : ",
        productCategory
      );
      const response = await ProductCategoryService.createProductCategory(
        productCategory
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  productCategories: [],
  createdProductCategory: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const ProductCategorySlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getProductCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategories = action.payload.data.categories;
        console.log(
          "action.payload in ProductCategorySlice is : ",
          action.payload.data.categories
        );
      })
      // ;builder
      .addCase(getProductCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(createProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdProductCategory = action.payload.data;
        console.log(
          "action.payload in created ProductCategorySlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(createProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      });
  },
});

export default ProductCategorySlice.reducer;
