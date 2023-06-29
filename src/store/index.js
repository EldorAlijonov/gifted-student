
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../slice/auth";

const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
