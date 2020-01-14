import { deleteCustomer, fetchCustomers } from "containers/customer/list/actions";
import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import CustomerList from "views/CustomerList";
import slice from "../profile/slice";

const { editCustomer } = slice.actions;

const mapStateToProps = ({ customerList }) => ({
    loading: customerList.loading,
    error: customerList.error,
    customers: customerList.customers,
});

const mapDispatchToProps = dispatch => ({
    fetchCustomers: (order) => dispatch(fetchCustomers(order)),
    deleteCustomer: id => dispatch(deleteCustomer(id)),
    startEditing: () => dispatch(editCustomer()),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(CustomerList),
);
