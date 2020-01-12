import slice from "./slice";
import api from "services/api";
import { fetchOrders } from "containers/order/list/actions";
import date from "services/date";

const {
    fetchOrderStart,
    fetchOrderSuccess,
    fetchOrderFail,
    saveOrderStart,
    saveOrderSuccess,
    saveOrderFail,
    createOrderStart,
    createOrderSuccess,
    createOrderFail,
} = slice.actions;

export const fetchOrder = id => async (dispatch, getState) => {
    try {
        dispatch(fetchOrderStart());
        const headers = { authorization: getState().auth.token };
        const order = await api.get(`order/${id}`, { headers }).json();
        dispatch(
            fetchOrderSuccess({
                order: {
                    ...order,
                    date: date.format(order.date),
                },
            }),
        );
    } catch (error) {
        console.error(error);
        dispatch(fetchOrderFail({ error }));
    }
};

export const saveOrder = (id, change) => async (dispatch, getState) => {
    try {
        dispatch(saveOrderStart());
        const headers = { authorization: getState().auth.token };
        await api.put(`order/${id}`, { json: change, headers });
        dispatch(saveOrderSuccess());
        dispatch(fetchOrders());
    } catch (error) {
        console.error(error);
        dispatch(saveOrderFail({ error }));
    }
};

export const createOrder = order => async (dispatch, getState) => {
    try {
        dispatch(createOrderStart());
        const headers = { authorization: getState().auth.token };
        await api.post("order", { json: order, headers });
        dispatch(createOrderSuccess());
        dispatch(fetchOrders());
    } catch (error) {
        console.error(error);
        dispatch(createOrderFail({ error }));
    }
};
