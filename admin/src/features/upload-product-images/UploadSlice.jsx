import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import uploadService from "./UploadService";
export const uploadImages = createAsyncThunk(
  "product/product-images",
  async (data, thunkAPI) => {
    try {
      console.log("thunkAPI in uploadSlice is : ", thunkAPI);

      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }

      const response = await uploadService.uploadImages(formData);
      console.log("response in uploadSlice is : ", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const uploadSlice = createSlice({
  name: "images",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload.data.subImages;
        console.log(
          "action.payload in uploadSlice is : ",
          action.payload.data.subImages
        );
      })
      // ;builder
      .addCase(uploadImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      });
  },
});

export default uploadSlice.reducer;
