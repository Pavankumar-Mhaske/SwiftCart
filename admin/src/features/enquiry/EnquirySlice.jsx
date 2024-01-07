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
