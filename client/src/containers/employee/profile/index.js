import { hot } from "react-hot-loader/root";
import { connect } from "react-redux";
import { createEmployee, fetchEmployee, saveEmployee } from "./actions";
import slice from "./slice";
import EmployeeProfile from "views/EmployeeProfile";

const { editEmployee, saveEmployeeSuccess, changeEmployee } = slice.actions;

const mapStateToProps = ({ employeeProfile }) => ({
    loading: employeeProfile.loading,
    editing: employeeProfile.editing,
    error: employeeProfile.error,
    employee: employeeProfile.employee,
});

const mapDispatchToProps = dispatch => ({
    fetchEmployee: id => dispatch(fetchEmployee(id)),
    startEditing: () => dispatch(editEmployee()),
    stopEditingAndSave: (id, change) => dispatch(saveEmployee(id, change)),
    stopEditingAndCreate: employee => dispatch(createEmployee(employee)),
    justStopEditing: () => dispatch(saveEmployeeSuccess()),
    handleChange: change => dispatch(changeEmployee({ change })),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(EmployeeProfile),
);
