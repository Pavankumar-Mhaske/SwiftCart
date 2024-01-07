import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import EnquiryService from "./EnquiryService";

export const getEnquiries = createAsyncThunk(
  "enquiries/get-enquiries",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in EnquirySlice is : ", thunkAPI);
      const response = await EnquiryService.getEnquiries();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAEnquiry = createAsyncThunk(
  "enquiries/get-enquiry",
  async (enquiryId, thunkAPI) => {
    try {
      console.log("thunkAPI in EnquirySlice is : ", thunkAPI);
      const response = await EnquiryService.getAEnquiry(enquiryId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createEnquiry = createAsyncThunk(
  "enquiries/create-enquiry",
  async (enquiry, thunkAPI) => {
    try {
      console.log("thunkAPI in enquirySlice is : ", thunkAPI);
      console.log("enquiry in enquirySlice is : ", enquiry);
      const response = await EnquiryService.createEnquiry(enquiry);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateEnquiry = createAsyncThunk(
  "enquiries/update-enquiry",
  async (enquiry, thunkAPI) => {
    try {
      console.log("thunkAPI in enquirySlice is : ", thunkAPI);
      console.log("enquiry in enquirySlice is : ", enquiry);
      const response = await EnquiryService.updateEnquiry(enquiry);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteEnquiry = createAsyncThunk(
  "enquiries/delete-enquiry",
  async (enquiryId, thunkAPI) => {
    try {
      console.log("thunkAPI in EnquirySlice is : ", thunkAPI);
      const response = await EnquiryService.deleteEnquiry(enquiryId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("reset_all");
const initialState = {
  enquiries: [],
  enquiry: {},
  createdEnquiry: {},
  updatedEnquiry: {},
  deletedEnquiry: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const enquirySlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnquiries.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getEnquiries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload.data.enquiries;
        console.log(
          "action.payload in enquirySlice is : ",
          action.payload.data.enquiries
        );
      })
      // ;builder
      .addCase(getEnquiries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(getAEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiry = action.payload.data;
        console.log(
          "action.payload in enquirySlice is : ",
          action.payload.data
        );
      })
      .addCase(getAEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder for create and update enquiry
      .addCase(createEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdEnquiry = action.payload.data;
        console.log(
          "action.payload in enquirySlice is : ",
          action.payload.data
        );
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      .addCase(updateEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEnquiry = action.payload.data;
        console.log(
          "action.payload in enquirySlice is : 💚💚💚💚 ",
          action.payload.data
        );
      })
      .addCase(updateEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(deleteEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(deleteEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedEnquiry = action.payload.data.deletedEnquiry;
        console.log(
          "action.payload in enquirySlice is :🧡🧡 ",
          action.payload.data.deletedEnquiry
        );
      })
      // ;builder
      .addCase(deleteEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      })
      // ;builder
      .addCase(resetState, () => initialState);
  },
});

export default enquirySlice.reducer;
