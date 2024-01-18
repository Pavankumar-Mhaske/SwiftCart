import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ContactService from "./ContactService";



export const createEnquiry = createAsyncThunk(
  "enquiries/create-enquiry",
  async (enquiry, thunkAPI) => {
    try {
      console.log("thunkAPI in enquirySlice is : ", thunkAPI);
      console.log("enquiry in enquirySlice is : ", enquiry);
      const response = await ContactService.createEnquiry(enquiry);
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
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const contactSlice = createSlice({
  name: "contact",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEnquiry.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(createEnquiry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiry = action.payload.data;
        console.log(
          "action.payload in contactSlice is : ",
          action.payload.data
        );
        state.message = action.payload.message;
      })
      .addCase(createEnquiry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(resetState, (state) => {
        state.isError = false;
        state.isSuccess = false;
        state.isLoading = false;
        state.message = "";
      });
  },
});

export default contactSlice.reducer;
