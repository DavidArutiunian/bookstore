import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    initialState: {
        loading: false,
        error: false,
        topMostActiveUsers: [],
        topMostPopularBooks: [],
    },
    name: "dashboard",
    reducers: {
        fetchTopMostActiveUsersStart: state => {
            state.loading = true;
        },

        fetchTopMostActiveUsersSuccess: (state, { payload }) => {
            state.topMostActiveUsers = payload.topMostActiveUsers;
            state.loading = false;
        },

        fetchTopMostActiveUsersFail: (state, { payload }) => {
            state.error = payload.error;
            state.loading = false;
        },

        fetchTopMostPopularBooksStart: state => {
            state.loading = true;
        },

        fetchTopMostPopularBooksSuccess: (state, { payload }) => {
            state.topMostPopularBooks = payload.topMostPopularBooks;
            state.loading = false;
        },

        fetchTopMostPopularBooksFail: (state, { payload }) => {
            state.error = payload.error;
            state.loading = false;
        },
    },
});
