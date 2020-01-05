import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "customerProfile",
    initialState: {
        loading: false,
        editing: false,
        error: false,
        customer: null,
    },
    reducers: {
        fetchCustomerStart: state => {
            state.loading = true;
        },

        fetchCustomerSuccess: (state, { payload }) => {
            state.loading = false;
            state.customer = payload.customer;
        },

        fetchCustomerFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },

        editCustomer: state => {
            state.editing = true;
        },

        saveCustomerStart: state => {
            state.editing = false;
            state.loading = true;
        },

        saveCustomerFail: (state, { payload }) => {
            state.editing = false;
            state.error = payload.error;
            state.loading = false;
        },

        saveCustomerSuccess: state => {
            state.editing = false;
            state.loading = false;
            state.customer = null;
        },

        changeCustomer: (state, { payload }) => {
            state.customer = {
                ...state.customer,
                ...payload.change,
            };
        },

        createCustomerSuccess: state => {
            state.editing = false;
            state.loading = false;
            state.customer = null;
        },

        createCustomerStart: state => {
            state.editig = false;
            state.loading = true;
        },

        createCustomerFail: (state, { payload }) => {
            state.editing = false;
            state.error = payload.error;
            state.loading = false;
        },
    },
});
