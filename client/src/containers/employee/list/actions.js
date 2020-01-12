import slice from "./slice";
import date from "services/date";
import api from "services/api";

const {
    fetchEmployeesFail,
    fetchEmployeesStart,
    fetchEmployeesSuccess,
    deleteEmployeeError,
    deleteEmployeeStart,
    deleteEmployeeSuccess,
} = slice.actions;

export const fetchEmployees = (extended = false) => async (dispatch, getState) => {
    try {
        dispatch(fetchEmployeesStart());
        const headers = { authorization: getState().auth.token };
        const employees = await api.get(`employee?extended=${extended}`, { headers }).json();
        const transformed = employees.map(row => ({
            ...row,
            date_of_birth: row.date_of_birth ? date.format(row.date_of_birth) : null,
        }));
        dispatch(fetchEmployeesSuccess({ employees: transformed }));
    } catch (error) {
        console.error(error);
        dispatch(fetchEmployeesFail({ error }));
    }
};

export const deleteEmployee = id => async (dispatch, getState) => {
    try {
        dispatch(deleteEmployeeStart());
        const headers = { authorization: getState().auth.token };
        await api.delete(`employee/${id}`, { headers });
        dispatch(deleteEmployeeSuccess());
        dispatch(fetchEmployees());
    } catch (error) {
        console.error(error);
        dispatch(deleteEmployeeError({ error }));
    }
};
