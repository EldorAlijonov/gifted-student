import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../../helpers/persistance-storage";

export const registerSlice = createSlice({
    name: "register",
    initialState: {
        isLoading: false,
        loggedIn: false,
        token: localStorage.getItem("token"),
    },
    reducers: {
        registerStart: (state) => {
            state.isLoading = true;
        },
        registerSuccess: (state, action) => {
            state.isLoading = false;
            state.loggedIn = true;
            state.token = action.payload;
            setItem("token", action.payload.access);
        },
        registerFailure: (state) => {
            state.isLoading = false;
            state.loggedIn = false;
        }
    }
});

export const { registerStart, registerSuccess, registerFailure } = registerSlice.actions;
export default registerSlice.reducer