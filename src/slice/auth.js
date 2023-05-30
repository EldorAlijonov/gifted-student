import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    loggedIn: false,
    error: null,
    user: null,
}

export const authSlise = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // login
        loginUserStart: state => {
            state.isLoading = true
        },
        loginUserSuccess: state => {
            state.loggedIn = true
            state.isLoading = false
        },
        loginUserFailure: state => {
            state.isLoading = false
            state.error = "error"
        },

        // register
        registerUserStart: state => {
            state.isLoading = true
        },
        registerUserSuccess: state => {
            state.loggedIn = true
            state.isLoading = false

        },
        registerUserFailure: state => {
            state.isLoading = false
            state.error = "error"

        },
    }
});
export const { loginUserStart, loginUserFailure,
    loginUserSuccess,
    registerUserStart, registerUserSuccess,
    registerUserFailure } = authSlise.actions

export default authSlise.reducer;