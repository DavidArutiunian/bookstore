import slice from "./slice";
import ky from "ky";
import { fetchCustomers } from "containers/customer/list/actions";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

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

export const fetchCustomer = id => async dispatch => {
    try {
        dispatch(fetchCustomerStart());
        const customer = await ky.get(`${process.env.REACT_APP_API}/customer/${id}`).json();
        dispatch(
            fetchCustomerSuccess({
                customer: {
                    ...customer,
                    date_of_birth: format(parseISO(customer.date_of_birth), "dd MMMM yyyy", {
                        locale: ru,
                    }),
                },
            }),
        );
    } catch (error) {
        console.error(error);
        dispatch(fetchCustomerFail({ error }));
    }
};

export const saveCustomer = (id, change) => async dispatch => {
    try {
        dispatch(saveCustomerStart());
        await ky.put(`${process.env.REACT_APP_API}/customer/${id}`, { json: change });
        dispatch(saveCustomerSuccess());
        dispatch(fetchCustomers());
    } catch (error) {
        console.error(error);
        dispatch(saveCustomerFail({ error }));
    }
};

export const createCustomer = customer => async dispatch => {
    try {
        dispatch(createCustomerStart());
        await ky.post(`${process.env.REACT_APP_API}/customer`, { json: customer });
        dispatch(createCustomerSuccess());
        dispatch(fetchCustomers());
    } catch (error) {
        console.error(error);
        dispatch(createCustomerFail({ error }));
    }
};
