import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import slice from "./slice";
import api from "services/api";
import { fetchBooks } from "containers/book/list/actions";
import { fetchCustomers } from "containers/customer/list/actions";
import { fetchEmployees } from "containers/employee/list/actions";

const {
    fetchOrdersFail,
    fetchOrdersStart,
    fetchOrdersSuccess,
    deleteOrderError,
    deleteOrderStart,
    deleteOrderSuccess,
} = slice.actions;

export const fetchOrders = () => async (dispatch, getState) => {
    try {
        dispatch(fetchOrdersStart());
        const headers = { authorization: getState().auth.token };
        const orders = await api.get("order", { headers }).json();
        const transformed = orders.map(row => ({
            ...row,
            date: format(parseISO(row.date), "dd MMMM yyyy", { locale: ru }),
        }));
        dispatch(fetchOrdersSuccess({ orders: transformed }));
        dispatch(fetchBooks());
        dispatch(fetchCustomers());
        dispatch(fetchEmployees(true));
    } catch (error) {
        console.error(error);
        dispatch(fetchOrdersFail({ error }));
    }
};

export const deleteOrder = id => async (dispatch, getState) => {
    try {
        dispatch(deleteOrderStart());
        const headers = { authorization: getState().auth.token };
        await api.delete(`order/${id}`, { headers });
        dispatch(deleteOrderSuccess());
        dispatch(fetchOrders());
    } catch (error) {
        console.error(error);
        dispatch(deleteOrderError({ error }));
    }
};
