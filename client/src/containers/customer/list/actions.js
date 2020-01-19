import slice from "./slice";
import date from "services/date";
import api from "services/api";
import QueryService from "services/query";

const {
    fetchCustomersFail,
    fetchCustomersStart,
    fetchCustomersSuccess,
    deleteCustomerError,
    deleteCustomerStart,
    deleteCustomerSuccess,
} = slice.actions;

export const fetchCustomers = (order = "") => async (dispatch, getState) => {
    try {
        dispatch(fetchCustomersStart());
        const headers = { authorization: getState().auth.token };
        const query = QueryService.orderToQuery(order);
        const customers = await api.get(`customer?${query}`, { headers }).json();
        const transformed = customers.map(row => ({
            ...row,
            date_of_birth: date.format(row.date_of_birth),
        }));
        dispatch(fetchCustomersSuccess({ customers: transformed }));
    } catch (error) {
        console.error(error);
        dispatch(fetchCustomersFail({ error }));
    }
};

export const deleteCustomer = id => async (dispatch, getState) => {
    try {
        dispatch(deleteCustomerStart());
        const headers = { authorization: getState().auth.token };
        await api.delete(`customer/${id}`, { headers });
        dispatch(deleteCustomerSuccess());
        dispatch(fetchCustomers());
    } catch (error) {
        console.error(error);
        dispatch(deleteCustomerError({ error }));
    }
};
