import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BrandService from "./BrandService";

export const getBrands = createAsyncThunk(
  "brands/get-brands",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in BrandSlice is : ", thunkAPI);
      const response = await BrandService.getBrands();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABrand = createAsyncThunk(
  "brands/get-brand",
  async (brandId, thunkAPI) => {
    try {
      console.log("thunkAPI in BrandSlice is : ", thunkAPI);
      const response = await BrandService.getABrand(brandId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBrand = createAsyncThunk(
  "brands/create-brand",
  async (brand, thunkAPI) => {
    try {
      console.log("thunkAPI in brandSlice is : ", thunkAPI);
      console.log("brand in brandSlice is : ", brand);
      const response = await BrandService.createBrand(brand);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brands/update-brand",
  async (brand, thunkAPI) => {
    try {
      console.log("thunkAPI in brandSlice is : ", thunkAPI);
      console.log("brand in brandSlice is : ", brand);
      const response = await BrandService.updateBrand(brand);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");
const initialState = {
  brands: [],
  brand: {},
  createdBrand: {},
  updatedBrand: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const brandSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrands.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brands = action.payload.data.brands;
        console.log(
          "action.payload in brandSlice is : ",
          action.payload.data.brands
        );
      })
      // ;builder
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBrand = action.payload.data;
        console.log(
          "action.payload in created brandSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(getABrand.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getABrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.brand = action.payload.data;
        console.log(
          "action.payload in getABrand brandSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(getABrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBrand = action.payload.data;
        console.log(
          "action.payload in updateBrand brandSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })

      .addCase(resetState, () => initialState);
  },
});

export default brandSlice.reducer;
