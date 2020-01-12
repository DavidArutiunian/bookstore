import TableCell from "@material-ui/core/TableCell";
import React from "react";
import { Link, navigate, Router } from "@reach/router";
import OrderProfile from "containers/order/profile";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import { Delete as DeleteIcon, LibraryAdd as AddIcon } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import BaseList from "components/BaseList";
import TableRow from "components/TableRow";
import DeleteTableCell from "components/DeleteTableCell";

function OrderList(props) {
    const { fetchOrders, orders, loading, deleteOrder, startEditing, error, books, customers, employees } = props;

    return (
        <BaseList
            loading={loading}
            error={error}
            columns={["Номер", "Дата заказа", "Покупатель", "Продавец", "Книга(и)"]}
            items={orders}
            deleteItem={deleteOrder}
            fetchList={fetchOrders}
            startEditing={startEditing}
            renderRouter={() => (
                <Router>
                    <OrderProfile
                        path="new"
                        customTitle="Новый заказ"
                        shouldFetchOrder={false}
                        showTitle={false}
                        showOptions={false}
                        shouldCreate={true}
                    />
                    <OrderProfile path=":id"/>
                </Router>
            )}
            renderTableRow={({ item: order, onDelete }) => (
                <TableRow key={order.id_order} onClick={() => navigate(`/order/${order.id_order}`)}>
                    <TableCell>{order.id_order}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{customers?.find(customer => customer.id_customer === order.id_customer)?.name}</TableCell>
                    <TableCell>{employees?.find(employee => employee.id_employee === order.id_employee)?.name}</TableCell>
                    <TableCell>
                        {books
                            ?.filter(book => order.books?.includes(book.id_book))
                            ?.map(book => (
                                <React.Fragment key={book.id_book}>
                                    {book.title}
                                    <br/>
                                </React.Fragment>
                            ))}
                    </TableCell>
                    <DeleteTableCell>
                        <IconButton onClick={onDelete(order.id_order)}>
                            <DeleteIcon/>
                        </IconButton>
                    </DeleteTableCell>
                </TableRow>
            )}
            renderSpeedDial={({ onAdd }) => (
                <SpeedDialAction
                    component={Link}
                    to="new"
                    tooltipTitle="Добавить заказ"
                    icon={<AddIcon/>}
                    onClick={onAdd}
                    title="Добавить заказ"
                />
            )}
        />
    );
}

OrderList.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    orders: PropTypes.array.isRequired,
    books: PropTypes.array,
    customers: PropTypes.array,
    employees: PropTypes.array,
    fetchOrders: PropTypes.func.isRequired,
    deleteOrder: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
};

export default hot(OrderList);
