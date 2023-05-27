import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    loggedIn: false,
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
        registerUserSuccess: state => { },
        registerUserFailure: state => { },
    }
});
export const { loginUserStart,registerUserStart } = authSlise.actions
export default authSlise.reducer;