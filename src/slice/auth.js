import { createSlice } from "@reduxjs/toolkit";
import { setItem } from "../helpers/storage";

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
        loginUserSuccess: (state, action) => {
            state.loggedIn = true
            state.isLoading = false
            state.user = action.payload
            // setItem('token', JSON.stringify(state.user.access))
        },
        loginUserFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },

        // register
        registerUserStart: state => {
            state.isLoading = true
        },
        registerUserSuccess: (state, action) => {
            state.loggedIn = true
            state.isLoading = false
            state.user = action.payload
            setItem("token", action.payload.access)
            // setItem('token', JSON.stringify(state.user.access))



        },
        registerUserFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload

        },
    }
});
export const { loginUserStart, loginUserFailure,
    loginUserSuccess,
    registerUserStart, registerUserSuccess,
    registerUserFailure } = authSlise.actions

export default authSlise.reducer;