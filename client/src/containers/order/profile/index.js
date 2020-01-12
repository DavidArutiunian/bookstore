import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import { createOrder, fetchOrder, saveOrder } from "./actions";
import slice from "./slice";
import OrderProfile from "views/OrderProfile";

const { editOrder, saveOrderSuccess, changeOrder } = slice.actions;

const mapStateToProps = ({ orderProfile, customerList, employeeList, bookList }) => ({
    loading: orderProfile.loading,
    editing: orderProfile.editing,
    error: orderProfile.error,
    order: orderProfile.order,
    customers: customerList.customers,
    employees: employeeList.employees,
    books: bookList.books,
});

const mapDispatchToProps = dispatch => ({
    fetchOrder: id => dispatch(fetchOrder(id)),
    startEditing: () => dispatch(editOrder()),
    stopEditingAndSave: (id, change) => dispatch(saveOrder(id, change)),
    stopEditingAndCreate: order => dispatch(createOrder(order)),
    justStopEditing: () => dispatch(saveOrderSuccess()),
    handleChange: change => dispatch(changeOrder({ change })),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(OrderProfile),
);
