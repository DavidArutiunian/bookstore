import slice from "./slice";
import date from "services/date";
import api from "services/api";
import { fetchBooks } from "containers/book/list/actions";
import { fetchCustomers } from "containers/customer/list/actions";
import { fetchEmployees } from "containers/employee/list/actions";
import QueryService from "services/query";

const {
    fetchOrdersFail,
    fetchOrdersStart,
    fetchOrdersSuccess,
    deleteOrderError,
    deleteOrderStart,
    deleteOrderSuccess,
} = slice.actions;

export const fetchOrders = order => async (dispatch, getState) => {
    try {
        dispatch(fetchOrdersStart());
        const headers = { authorization: getState().auth.token };
        const query = QueryService.orderToQuery(order);
        const orders = await api.get(`order?${query}`, { headers }).json();
        const transformed = orders.map(row => ({
            ...row,
            date: date.format(row.date),
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
