import TableCell from "@material-ui/core/TableCell";
import React from "react";
import { Link, navigate, Router } from "@reach/router";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import { Delete as DeleteIcon, LibraryAdd as AddIcon } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import BaseList from "components/BaseList";
import TableRow from "components/TableRow";
import DeleteTableCell from "components/DeleteTableCell";
import EmployeeProfile from "containers/employee/profile";
import useOrder from "hooks/use-order";

function EmployeeList(props) {
    const { fetchEmployees, employees, loading, deleteEmployee, startEditing, error } = props;

    const [order, toggleOrder] = useOrder(fetchEmployees);

    return (
        <BaseList
            order={order}
            onOrderToggle={toggleOrder}
            loading={loading}
            error={error}
            columns={[
                {
                    label: "Имя",
                    value: "name",
                    sortable: true,
                },
                {
                    label: "Логин",
                    value: "login",
                    sortable: true,
                },
                {
                    label: "Дата рождения",
                    value: "date_of_birth",
                    sortable: true,
                },
                {
                    label: "Адрес",
                    value: "address",
                    sortable: true,
                },
            ]}
            items={employees}
            deleteItem={deleteEmployee}
            fetchList={fetchEmployees}
            startEditing={startEditing}
            renderRouter={() => (
                <Router>
                    <EmployeeProfile
                        path="new"
                        customTitle="Новый продавец"
                        shouldFetchEmployee={false}
                        showTitle={false}
                        showOptions={false}
                        shouldCreate={true}
                    />
                    <EmployeeProfile path=":id" />
                </Router>
            )}
            renderTableRow={({ item: employee, onDelete }) => (
                <TableRow
                    key={employee.id_employee}
                    onClick={() => navigate(`/employee/${employee.id_employee}`)}
                >
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.login}</TableCell>
                    <TableCell>{employee.date_of_birth}</TableCell>
                    <TableCell>{employee.address}</TableCell>
                    <DeleteTableCell>
                        <IconButton onClick={onDelete(employee.id_employee)}>
                            <DeleteIcon />
                        </IconButton>
                    </DeleteTableCell>
                </TableRow>
            )}
            renderSpeedDial={({ onAdd }) => (
                <SpeedDialAction
                    component={Link}
                    to="new"
                    tooltipTitle="Добавить продавца"
                    icon={<AddIcon />}
                    onClick={onAdd}
                    title="Добавить продавца"
                />
            )}
        />
    );
}

EmployeeList.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    employees: PropTypes.array.isRequired,
    fetchEmployees: PropTypes.func.isRequired,
    deleteEmployee: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
};

export default hot(EmployeeList);
