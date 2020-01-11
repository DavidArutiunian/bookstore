import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "employeeProfile",
    initialState: {
        loading: false,
        editing: false,
        error: false,
        employee: null,
    },
    reducers: {
        fetchEmployeeStart: state => {
            state.loading = true;
        },

        fetchEmployeeSuccess: (state, { payload }) => {
            state.loading = false;
            state.employee = payload.employee;
        },

        fetchEmployeeFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },

        editEmployee: state => {
            state.editing = true;
        },

        saveEmployeeStart: state => {
            state.editing = false;
            state.loading = true;
        },

        saveEmployeeFail: (state, { payload }) => {
            state.editing = false;
            state.error = payload.error;
            state.loading = false;
        },

        saveEmployeeSuccess: state => {
            state.editing = false;
            state.loading = false;
            state.employee = null;
        },

        changeEmployee: (state, { payload }) => {
            state.employee = {
                ...state.employee,
                ...payload.change,
            };
        },

        createEmployeeSuccess: state => {
            state.editing = false;
            state.loading = false;
            state.employee = null;
        },

        createEmployeeStart: state => {
            state.editig = false;
            state.loading = true;
        },

        createEmployeeFail: (state, { payload }) => {
            state.editing = false;
            state.error = payload.error;
            state.loading = false;
        },
    },
});
