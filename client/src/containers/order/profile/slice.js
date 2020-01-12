import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "orderProfile",
    initialState: {
        loading: false,
        editing: false,
        error: false,
        order: null,
    },
    reducers: {
        fetchOrderStart: state => {
            state.loading = true;
        },

        fetchOrderSuccess: (state, { payload }) => {
            state.loading = false;
            state.order = payload.order;
        },

        fetchOrderFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },

        editOrder: state => {
            state.editing = true;
        },

        saveOrderStart: state => {
            state.editing = false;
            state.loading = true;
        },

        saveOrderFail: (state, { payload }) => {
            state.editing = false;
            state.error = payload.error;
            state.loading = false;
        },

        saveOrderSuccess: state => {
            state.editing = false;
            state.loading = false;
            state.order = null;
        },

        changeOrder: (state, { payload }) => {
            state.order = {
                ...state.order,
                ...payload.change,
            };
        },

        createOrderSuccess: state => {
            state.editing = false;
            state.loading = false;
            state.order = null;
        },

        createOrderStart: state => {
            state.editig = false;
            state.loading = true;
        },

        createOrderFail: (state, { payload }) => {
            state.editing = false;
            state.error = payload.error;
            state.loading = false;
        },
    },
});
