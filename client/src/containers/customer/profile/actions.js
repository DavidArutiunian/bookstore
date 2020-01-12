import slice from "./slice";
import api from "services/api";
import date from "services/date";
import { fetchCustomers } from "containers/customer/list/actions";

const {
    fetchCustomerStart,
    fetchCustomerSuccess,
    fetchCustomerFail,
    saveCustomerStart,
    saveCustomerSuccess,
    saveCustomerFail,
    createCustomerStart,
    createCustomerSuccess,
    createCustomerFail,
} = slice.actions;

export const fetchCustomer = id => async (dispatch, getState) => {
    try {
        dispatch(fetchCustomerStart());
        const headers = { authorization: getState().auth.token };
        const customer = await api.get(`customer/${id}`, { headers }).json();
        dispatch(
            fetchCustomerSuccess({
                customer: {
                    ...customer,
                    date_of_birth: date.format(customer.date_of_birth),
                },
            }),
        );
    } catch (error) {
        console.error(error);
        dispatch(fetchCustomerFail({ error }));
    }
};

export const saveCustomer = (id, change) => async (dispatch, getState) => {
    try {
        dispatch(saveCustomerStart());
        const headers = { authorization: getState().auth.token };
        await api.put(`customer/${id}`, { json: change, headers });
        dispatch(saveCustomerSuccess());
        dispatch(fetchCustomers());
    } catch (error) {
        console.error(error);
        dispatch(saveCustomerFail({ error }));
    }
};

export const createCustomer = customer => async (dispatch, getState) => {
    try {
        dispatch(createCustomerStart());
        const headers = { authorization: getState().auth.token };
        await api.post("customer", { json: customer, headers });
        dispatch(createCustomerSuccess());
        dispatch(fetchCustomers());
    } catch (error) {
        console.error(error);
        dispatch(createCustomerFail({ error }));
    }
};
