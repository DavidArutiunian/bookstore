import { deleteEmployee, fetchEmployees } from "./actions";
import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import EmployeeList from "views/EmployeeList";
import slice from "../profile/slice";

const { editEmployee } = slice.actions;

const mapStateToProps = ({ employeeList }) => ({
    loading: employeeList.loading,
    error: employeeList.error,
    employees: employeeList.employees,
});

const mapDispatchToProps = dispatch => ({
    fetchEmployees: () => dispatch(fetchEmployees()),
    deleteEmployee: id => dispatch(deleteEmployee(id)),
    startEditing: () => dispatch(editEmployee()),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(EmployeeList),
);
