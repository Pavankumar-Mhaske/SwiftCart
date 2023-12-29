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

export const createBlogCategory = createAsyncThunk(
  "blog-categories/create-blog-categories",
  async (BlogCategory, thunkAPI) => {
    try {
      console.log("thunkAPI in BlogCategorySlice is : ", thunkAPI);
      console.log("BlogCategory in BlogCategorySlice is : ", BlogCategory);
      const response = await BlogCategoryService.createBlogCategory(
        BlogCategory
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  blogCategories: [],
  createdBlogCategory: {},
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
      })
      // ;builder
      .addCase(createBlogCategory.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(createBlogCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlogCategory = action.payload.data;
        console.log(
          "action.payload in BlogCategorySlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(createBlogCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      });
  },
});

export default BlogCategorySlice.reducer;
