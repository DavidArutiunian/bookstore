import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "authorList",
    initialState: {
        loading: false,
        error: false,
        authors: [],
    },
    reducers: {
        fetchAuthorsStart: state => {
            state.loading = true;
        },

        fetchAuthorsSuccess: (state, { payload }) => {
            state.loading = false;
            state.authors = payload.authors;
        },

        fetchAuthorsFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },

        deleteAuthorStart: state => {
            state.loading = true;
        },

        deleteAuthorSuccess: state => {
            state.loading = false;
        },

        deleteAuthorError: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },
    },
});
