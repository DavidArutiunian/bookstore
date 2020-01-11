import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "employeeList",
    initialState: {
        loading: false,
        error: false,
        employees: [],
    },
    reducers: {
        fetchEmployeesStart: state => {
            state.loading = true;
        },

        fetchEmployeesSuccess: (state, { payload }) => {
            state.loading = false;
            state.employees = payload.employees;
        },

        fetchEmployeesFail: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },

        deleteEmployeeStart: state => {
            state.loading = true;
        },

        deleteEmployeeSuccess: state => {
            state.loading = false;
        },

        deleteEmployeeError: (state, { payload }) => {
            state.loading = false;
            state.error = payload.error;
        },
    },
});
