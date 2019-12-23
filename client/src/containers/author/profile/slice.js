import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "authorProfile",
    initialState: {
        loading: false,
        editing: false,
        error: false,
        author: null,
    },
    reducers: {
        fetchAuthorStart: state => {
            state.loading = true;
        },

        fetchAuthorSuccess: (state, { payload }) => {
            state.loading = false;
            state.author = payload.author;
        },

        fetchAuthorFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },

        editAuthor: state => {
            state.editing = true;
        },

        saveAuthorStart: state => {
            state.editing = false;
            state.loading = true;
        },

        saveAuthorFail: (state, { payload }) => {
            state.editing = false;
            state.error = payload.error;
            state.loading = false;
        },

        saveAuthorSuccess: state => {
            state.editing = false;
            state.loading = false;
            state.author = null;
        },

        changeAuthor: (state, { payload }) => {
            state.author = {
                ...state.author,
                ...payload.change,
            };
        },

        createAuthorSuccess: state => {
            state.editing = false;
            state.loading = false;
            state.author = null;
        },

        createAuthorStart: state => {
            state.editig = false;
            state.loading = true;
        },

        createAuthorFail: (state, { payload }) => {
            state.editing = false;
            state.error = payload.error;
            state.loading = false;
        },
    },
});
