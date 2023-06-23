import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/storage";

const initialState = {
  isLoading: false,
  loggedIn: false,
  error: null,
  user: null,
  token: localStorage.getItem("token"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login
    loginUserStart: (state) => {
      state.isLoading = true;
    },
    loginUserSuccess: (state, action) => {
      state.loggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
      state.token = action.payload;
      setItem("token", action.payload.access);
    },
    loginUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    // logout user
    logoutUser: (state) => {
      state.isLoading = true;
    },
    logoutUserSuccess: (state) => {
      state.isLoading = false;
      state.user = null;
      state.loggedIn = false;
    },

    // register
    registerUserStart: (state) => {
      state.isLoading = true;
    },
    registerUserSuccess: (state, action) => {
      state.loggedIn = true;
      state.isLoading = false;
      state.user = action.payload;
      state.token = action.payload;
      setItem("token", action.payload.access);
    },
    registerUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginUserStart,
  loginUserFailure,
  loginUserSuccess,
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  logoutUser,
  logoutUserSuccess,
} = authSlice.actions;

export default authSlice.reducer;
