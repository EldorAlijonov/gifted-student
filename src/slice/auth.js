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
        loginUserStart: state => {
            state.isLoading = true
        },
        loginUserSuccess: state => { },
        loginUserFailure: state => { },
    }
});
export const { loginUserStart } = authSlise.actions
export default authSlise.reducer;