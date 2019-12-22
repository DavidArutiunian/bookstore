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
import PublishingOfficeProfile from "containers/publishing_office/profile";

function PublishingOfficeList(props) {
    const { fetchOffices, offices, loading, deleteOffice, startEditing, error } = props;

    return (
        <BaseList
            loading={loading}
            error={error}
            columns={["Номер", "Название", "Адрес", "Эл. почта"]}
            items={offices}
            deleteItem={deleteOffice}
            fetchList={fetchOffices}
            startEditing={startEditing}
            renderRouter={() => (
                <Router>
                    <PublishingOfficeProfile
                        path="new"
                        customTitle="Новый изадетльский дом"
                        shouldFetchOffice={false}
                        showTitle={false}
                        showOptions={false}
                        shouldCreate={true}
                    />
                    <PublishingOfficeProfile path=":id" />
                </Router>
            )}
            renderTableRow={({ item: office, onDelete }) => (
                <TableRow
                    key={office.id_publishing_office}
                    onClick={() => navigate(`publishing_office/${office.id_publishing_office}`)}
                >
                    <TableCell>{office.id_publishing_office}</TableCell>
                    <TableCell>{office.name}</TableCell>
                    <TableCell>{office.address}</TableCell>
                    <TableCell>{office.email}</TableCell>
                    <DeleteTableCell>
                        <IconButton onClick={onDelete(office.id_publishing_office)}>
                            <DeleteIcon />
                        </IconButton>
                    </DeleteTableCell>
                </TableRow>
            )}
            renderSpeedDial={({ onAdd }) => (
                <SpeedDialAction
                    component={Link}
                    to="new"
                    tooltipTitle="Добавить издательский дом"
                    icon={<AddIcon />}
                    onClick={onAdd}
                    title="Добавить издательский дом"
                />
            )}
        />
    );
}

PublishingOfficeList.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    offices: PropTypes.array.isRequired,
    fetchOffices: PropTypes.func.isRequired,
    deleteOffice: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
};

export default hot(PublishingOfficeList);
