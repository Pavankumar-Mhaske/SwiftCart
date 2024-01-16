import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import BlogService from "./BlogService";

export const getBlogs = createAsyncThunk(
  "blogs/get-blogs",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in blogSlice is : ", thunkAPI);
      const response = await BlogService.getBlogs();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getABlog = createAsyncThunk(
  "blogs/get-blog",
  async (blogId, thunkAPI) => {
    try {
      console.log("thunkAPI in blogSlice is : ", thunkAPI);
      const response = await BlogService.getABlog(blogId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");
const initialState = {
  blogs: [],
  blog: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blogs = action.payload.data.blogs;
        console.log(
          "action.payload in blogSlice is 💘💘 : ",
          action.payload.data.blogs
        );
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.blog = action.payload.data;
        console.log(
          "action.payload in blogSlice is 💘💘 : ",
          action.payload.data
        );
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
