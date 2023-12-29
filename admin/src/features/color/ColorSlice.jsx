import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Colorservice from "./ColorService";

export const getColors = createAsyncThunk(
  "colors/get-colors",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in colorSlice is : ", thunkAPI);
      const response = await Colorservice.getColors();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createColor = createAsyncThunk(
  "colors/create-color",
  async (color, thunkAPI) => {
    try {
      console.log("thunkAPI in colorSlice is : ", thunkAPI);
      console.log("color in colorSlice is : ", color);
      const response = await Colorservice.createColor(color);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  colors: [],
  createdColor: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const colorSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload.data.colors;
        console.log(
          "action.payload in colorSlice is : ",
          action.payload.data.colors
        );
      })
      // ;builder
      .addCase(getColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdColor = action.payload.data;
        console.log(
          "action.payload in created colorSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      });
  },
});

export default colorSlice.reducer;
