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
import CustomerProfile from "containers/customer/profile";

function CustomerList(props) {
    const { fetchCustomers, customers, loading, deleteCustomer, startEditing, error } = props;

    return (
        <BaseList
            loading={loading}
            error={error}
            columns={["Имя", "Дата рождения", "Эл. почта"]}
            items={customers}
            deleteItem={deleteCustomer}
            fetchList={fetchCustomers}
            startEditing={startEditing}
            renderRouter={() => (
                <Router>
                    <CustomerProfile
                        path="new"
                        customTitle="Новый покупатель"
                        shouldFetchCustomer={false}
                        showTitle={false}
                        showOptions={false}
                        shouldCreate={true}
                    />
                    <CustomerProfile path=":id" />
                </Router>
            )}
            renderTableRow={({ item: customer, onDelete }) => (
                <TableRow
                    key={customer.id_customer}
                    onClick={() => navigate(`/customer/${customer.id_customer}`)}
                >
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.date_of_birth}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <DeleteTableCell>
                        <IconButton onClick={onDelete(customer.id_customer)}>
                            <DeleteIcon />
                        </IconButton>
                    </DeleteTableCell>
                </TableRow>
            )}
            renderSpeedDial={({ onAdd }) => (
                <SpeedDialAction
                    component={Link}
                    to="new"
                    tooltipTitle="Добавить покупателя"
                    icon={<AddIcon />}
                    onClick={onAdd}
                    title="Добавить покупателя"
                />
            )}
        />
    );
}

CustomerList.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    customers: PropTypes.array.isRequired,
    fetchCustomers: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
};

export default hot(CustomerList);
