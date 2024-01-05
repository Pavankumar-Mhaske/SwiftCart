import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

export const getAProductCategory = createAsyncThunk(
  "product-categories/get-product-category",
  async (productCategoryId, thunkAPI) => {
    try {
      console.log("thunkAPI in ProductCategorySlice is : ", thunkAPI);
      const response = await ProductCategoryService.getAProductCategory(
        productCategoryId
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProductCategory = createAsyncThunk(
  "product-categories/create-product-categories",
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

export const updateProductCategory = createAsyncThunk(
  "product-categories/update-product-category",
  async (productCategory, thunkAPI) => {
    try {
      console.log("thunkAPI in brandSlice is : ", thunkAPI);
      console.log("brand in brandSlice is : ", productCategory);
      const response = await ProductCategoryService.updateProductCategory(
        productCategory
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProductCategory = createAsyncThunk(
  "product-categories/delete-product-category",
  async (productCategoryId, thunkAPI) => {
    try {
      console.log("thunkAPI in BrandSlice is : ", thunkAPI);
      const response = await ProductCategoryService.deleteProductCategory(
        productCategoryId
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");

const initialState = {
  productCategories: [],
  productCategory: {},
  createdProductCategory: {},
  updatedProductCategory: {},
  deletedProductCategory: {},
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
      })
      // ;builder
      .addCase(getAProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getAProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productCategory = action.payload.data;
        console.log(
          "action.payload in ProductCategorySlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(getAProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(updateProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(updateProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProductCategory = action.payload.data;
        console.log(
          "action.payload in updated ProductCategorySlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(deleteProductCategory.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedProductCategory = action.payload.data;
        console.log(
          "action.payload in deleted ProductCategorySlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(deleteProductCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default ProductCategorySlice.reducer;
