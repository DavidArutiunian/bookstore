import { deleteOrder, fetchOrders } from "./actions";
import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import OrderList from "views/OrderList";
import slice from "../profile/slice";

const { editOrder } = slice.actions;

const mapStateToProps = ({ orderList, bookList, customerList, employeeList }) => ({
    loading: orderList.loading,
    error: orderList.error,
    orders: orderList.orders,
    books: bookList.books,
    customers: customerList.customers,
    employees: employeeList.employees
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: () => dispatch(fetchOrders()),
    deleteOrder: id => dispatch(deleteOrder(id)),
    startEditing: () => dispatch(editOrder()),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(OrderList),
);
