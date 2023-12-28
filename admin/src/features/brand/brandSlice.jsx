import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

const initialState = {
  brands: [],
  createdBrand: {},
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
        console.log("action.payload in brandSlice is : ", action.payload.data);
      })
      // ;builder
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      });
  },
});

export default brandSlice.reducer;
