import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "orderList",
    initialState: {
        loading: false,
        error: false,
        orders: [],
    },
    reducers: {
        fetchOrdersStart: state => {
            state.loading = true;
        },

        fetchOrdersSuccess: (state, { payload }) => {
            state.loading = false;
            state.orders = payload.orders;
        },

        fetchOrdersFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },

        deleteOrderStart: state => {
            state.loading = true;
        },

        deleteOrderSuccess: state => {
            state.loading = false;
        },

        deleteOrderError: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },
    },
});
