import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    initialState: {
        loading: false,
        error: false,
        user: null,
        token: null,
    },
    name: "auth",
    reducers: {
        loginUserStart: state => {
            state.loading = true;
        },

        loginUserSuccess: (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
            state.loading = false;
        },

        loadingUserFail: (state, { payload }) => {
            state.error = payload.error;
            state.loading = false;
        },
    },
});
