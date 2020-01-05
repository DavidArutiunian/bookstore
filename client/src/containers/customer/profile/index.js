import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import { createCustomer, fetchCustomer, saveCustomer } from "./actions";
import slice from "./slice";
import CustomerProfile from "views/CustomerProfile";

const { editCustomer, saveCustomerSuccess, changeCustomer } = slice.actions;

const mapStateToProps = ({ customerProfile }) => ({
    loading: customerProfile.loading,
    editing: customerProfile.editing,
    error: customerProfile.error,
    customer: customerProfile.customer,
});

const mapDispatchToProps = dispatch => ({
    fetchCustomer: id => dispatch(fetchCustomer(id)),
    startEditing: () => dispatch(editCustomer()),
    stopEditingAndSave: (id, change) => dispatch(saveCustomer(id, change)),
    stopEditingAndCreate: customer => dispatch(createCustomer(customer)),
    justStopEditing: () => dispatch(saveCustomerSuccess()),
    handleChange: change => dispatch(changeCustomer({ change })),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(CustomerProfile),
);
