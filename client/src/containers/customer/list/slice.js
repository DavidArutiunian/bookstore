import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "customerList",
    initialState: {
        loading: false,
        error: false,
        customers: [],
    },
    reducers: {
        fetchCustomersStart: state => {
            state.loading = true;
        },

        fetchCustomersSuccess: (state, { payload }) => {
            state.loading = false;
            state.customers = payload.customers;
        },

        fetchCustomersFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },

        deleteCustomerStart: state => {
            state.loading = true;
        },

        deleteCustomerSuccess: state => {
            state.loading = false;
        },

        deleteCustomerError: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },
    },
});
