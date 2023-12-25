import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customerService from "./CustomerService";

export const getUsers = createAsyncThunk(
  "customers/get-customers",
  async (thunkAPI) => {
    try {
      console.log("thunkAPI in customerSlice is : ", thunkAPI);
      const response = await customerService.getUsers();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const customerSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload.data.users;
        console.log(
          "action.payload in customerSlice is : ",
          action.payload.data.users
        );
      })
      // ;builder
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        // state.user = null;
        state.message = action.error;
      });
  },
});

export default customerSlice.reducer;
