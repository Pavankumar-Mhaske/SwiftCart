import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Blogservice from "./BlogService";

export const getBlogs = createAsyncThunk(
  "blogs/get-blogs",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in blogSlice is : ", thunkAPI);
      const response = await Blogservice.getBlogs();
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
      const response = await Blogservice.getABlog(blogId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/create-blog",
  async (blog, thunkAPI) => {
    try {
      console.log("thunkAPI in blogSlice is : ", thunkAPI);
      console.log("blog in blogSlice is : ", blog);
      const response = await Blogservice.createBlog(blog);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/update-blog",
  async (blog, thunkAPI) => {
    try {
      console.log("thunkAPI in blogSlice is : ", thunkAPI);
      console.log("blog in blogSlice is : ", blog);
      const response = await Blogservice.updateBlog(blog);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/delete-blog",
  async (blogId, thunkAPI) => {
    try {
      console.log("thunkAPI in blogSlice is : ", thunkAPI);
      const response = await Blogservice.deleteBlog(blogId);
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
  createdBlog: {},
  updatedBlog: {},
  deletedBlog: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const blogSlice = createSlice({
  name: "users",
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
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload.data.blogs;
        console.log(
          "action.payload in blogSlice is : ",
          action.payload.data.blogs
        );
      })
      // ;builder
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdBlog = action.payload.data;
        console.log(
          "action.payload in create blogSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(getABlog.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.blog = action.payload.data;
        console.log(
          "action.payload in getABlog blogSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload.data;
        console.log(
          "action.payload in updateBlog blogSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBlog = action.payload.data;
        console.log(
          "action.payload in deleteBlog blogSlice is : ",
          action.payload.data
        );
      })
      // ;builder
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
