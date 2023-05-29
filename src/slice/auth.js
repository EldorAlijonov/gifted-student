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
        loginUserSuccess: state => { },
        loginUserFailure: state => { },

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
export const { loginUserStart,
    registerUserStart, registerUserSuccess,
    registerUserFailure } = authSlise.actions
    
export default authSlise.reducer;