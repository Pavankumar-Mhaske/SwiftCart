import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import AuthService from "./AuthService";

//  register thunk
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      console.log("thunkAPI in authSlice is : ", thunkAPI);
      const response = await AuthService.register(user);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//  login thunk
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    console.log("thunkAPI in authSlice is : ", thunkAPI);
    const response = await AuthService.login(user);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const getUserFromLocalStorage = localStorage.getItem("accessToken")
  ? JSON.parse(localStorage.getItem("accessToken"))
  : null;
export const resetState = createAction("reset_all");

const initialState = {
  user: getUserFromLocalStorage,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.data.user;
        console.log(
          "state.user in authSlice is 💘💘 : ",
          action.payload.data.user
        );
      })
      // ;builder
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload.message;
      })
      // ;builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      // ;builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload.data.user;
        console.log(
          "state.user in authSlice is 💘💘 : ",
          action.payload.data.user
        );
        console.log(
          "Token inside the authSlice is : ",
          action.payload.data.user.accessToken
        );
      })
      // ;builder
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload.message;
      })
      .addCase(resetState, () => initialState);
  },
});

export default authSlice.reducer;
