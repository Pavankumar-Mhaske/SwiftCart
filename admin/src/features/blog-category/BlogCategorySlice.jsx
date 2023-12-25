import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import BlogCategoryService from "./BlogCategoryService";

export const getBlogCategories = createAsyncThunk(
  "blog-categories/get-blog-categories",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in BlogCategorySlice is : ", thunkAPI);
      const response = await BlogCategoryService.getBlogCategories();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  blogCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const BlogCategorySlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCategories.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getBlogCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCategories = action.payload.data.categories;
        console.log(
          "action.payload in BlogCategorySlice is : ",
          action.payload.data.categories
        );
      })
      // ;builder
      .addCase(getBlogCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      });
  },
});

export default BlogCategorySlice.reducer;
