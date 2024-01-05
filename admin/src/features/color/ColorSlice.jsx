import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ColorService from "./ColorService";

export const getColors = createAsyncThunk(
  "colors/get-colors",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in colorSlice is : ", thunkAPI);
      const response = await ColorService.getColors();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAColor = createAsyncThunk(
  "colors/get-color",
  async (colorId, thunkAPI) => {
    try {
      console.log("thunkAPI in ColorSlice is : ", thunkAPI);
      const response = await ColorService.getAColor(colorId);
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
      const response = await ColorService.createColor(color);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateColor = createAsyncThunk(
  "colors/update-color",
  async (color, thunkAPI) => {
    try {
      console.log("thunkAPI in colorSlice is : ", thunkAPI);
      console.log("color in colorSlice is : ", color);
      const response = await ColorService.updateColor(color);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "colors/delete-color",
  async (colorId, thunkAPI) => {
    try {
      console.log("thunkAPI in ColorSlice is : ", thunkAPI);
      const response = await ColorService.deleteColor(colorId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const resetState = createAction("reset_all");

const initialState = {
  colors: [],
  color: {},
  createdColor: {},
  updatedColor: {},
  deletedColor: {},
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
      })
      // ;builder
      .addCase(getAColor.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getAColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.color = action.payload.data;
        console.log(
          "action.payload in getAColor colorSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(getAColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedColor = action.payload.data;
        console.log(
          "action.payload in updated colorSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedColor = action.payload.data;
        console.log(
          "action.payload in deleted colorSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
