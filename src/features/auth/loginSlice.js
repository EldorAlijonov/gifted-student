import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../../helpers/persistance-storage";

export const loginSlice = createSlice({
    name: "login",
    initialState: {
        user: [],
        isLoading: false,
        loggedIn: false,
        token: localStorage.getItem("token"),
    },
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.loggedIn = true;
            state.token = action.payload;
            setItem("token", action.payload.access);
        },
        loginFailure: (state) => {
            state.isLoading = false;
            state.loggedIn = false;

        }
    }
});

export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;
export default loginSlice.reducer