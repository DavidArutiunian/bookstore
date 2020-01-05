import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import slice from "./slice";
import ky from "ky";

const {
    fetchCustomersFail,
    fetchCustomersStart,
    fetchCustomersSuccess,
    deleteCustomerError,
    deleteCustomerStart,
    deleteCustomerSuccess,
} = slice.actions;

export const fetchCustomers = () => async dispatch => {
    try {
        dispatch(fetchCustomersStart());
        const customers = await ky.get(`${process.env.REACT_APP_API}/customer`).json();
        const transformed = customers.map(row => ({
            ...row,
            date_of_birth: format(parseISO(row.date_of_birth), "dd MMMM yyyy", { locale: ru }),
        }));
        dispatch(fetchCustomersSuccess({ customers: transformed }));
    } catch (error) {
        console.error(error);
        dispatch(fetchCustomersFail({ error }));
    }
};

export const deleteCustomer = id => async dispatch => {
    try {
        dispatch(deleteCustomerStart());
        await ky.delete(`${process.env.REACT_APP_API}/customer/${id}`);
        dispatch(deleteCustomerSuccess());
        dispatch(fetchCustomers());
    } catch (error) {
        console.error(error);
        dispatch(deleteCustomerError({ error }));
    }
};
