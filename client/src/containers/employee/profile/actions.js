import slice from "./slice";
import api from "services/api";
import { fetchEmployees } from "containers/employee/list/actions";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

const {
    fetchEmployeeStart,
    fetchEmployeeSuccess,
    fetchEmployeeFail,
    saveEmployeeStart,
    saveEmployeeSuccess,
    saveEmployeeFail,
    createEmployeeStart,
    createEmployeeSuccess,
    createEmployeeFail,
} = slice.actions;

export const fetchEmployee = id => async (dispatch, getState) => {
    try {
        dispatch(fetchEmployeeStart());
        const headers = { authorization: getState().auth.token };
        const employee = await api.get(`employee/${id}`, { headers }).json();
        dispatch(
            fetchEmployeeSuccess({
                employee: {
                    ...employee,
                    date_of_birth: format(parseISO(employee.date_of_birth), "dd MMMM yyyy", {
                        locale: ru,
                    }),
                },
            }),
        );
    } catch (error) {
        console.error(error);
        dispatch(fetchEmployeeFail({ error }));
    }
};

export const saveEmployee = (id, change) => async (dispatch, getState) => {
    try {
        dispatch(saveEmployeeStart());
        const headers = { authorization: getState().auth.token };
        await api.put(`employee/${id}`, { json: change, headers });
        dispatch(saveEmployeeSuccess());
        dispatch(fetchEmployees());
    } catch (error) {
        console.error(error);
        dispatch(saveEmployeeFail({ error }));
    }
};

export const createEmployee = employee => async (dispatch, getState) => {
    try {
        dispatch(createEmployeeStart());
        const headers = { authorization: getState().auth.token };
        await api.post("employee", { json: employee, headers });
        dispatch(createEmployeeSuccess());
        dispatch(fetchEmployees());
    } catch (error) {
        console.error(error);
        dispatch(createEmployeeFail({ error }));
    }
};
