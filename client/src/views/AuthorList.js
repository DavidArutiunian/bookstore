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
import AuthorProfile from "containers/author/profile";
import useOrder from "hooks/use-order";

function AuthorList(props) {
    const { fetchAuthors, authors, loading, deleteAuthor, startEditing, error } = props;

    const [order, toggleOrder] = useOrder(fetchAuthors);

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
                    label: "Фамилия",
                    value: "surname",
                    sortable: true,
                },
                {
                    label: "Дата рождения",
                    value: "date_of_birth",
                    sortable: true,
                },
                {
                    label: "Издательский дом",
                    value: "publishing_office",
                    sortable: false,
                }]}
            items={authors}
            deleteItem={deleteAuthor}
            fetchList={fetchAuthors}
            startEditing={startEditing}
            renderRouter={() => (
                <Router>
                    <AuthorProfile
                        path="new"
                        customTitle="Новый автор"
                        shouldFetchAuthor={false}
                        showTitle={false}
                        showOptions={false}
                        shouldCreate={true}
                    />
                    <AuthorProfile path=":id"/>
                </Router>
            )}
            renderTableRow={({ item: author, onDelete }) => (
                <TableRow
                    key={author.id_author}
                    onClick={() => navigate(`/author/${author.id_author}`)}
                >
                    <TableCell>{author.name}</TableCell>
                    <TableCell>{author.surname}</TableCell>
                    <TableCell>{author.date_of_birth}</TableCell>
                    <TableCell>{author.publishing_office}</TableCell>
                    <DeleteTableCell>
                        <IconButton onClick={onDelete(author.id_author)}>
                            <DeleteIcon/>
                        </IconButton>
                    </DeleteTableCell>
                </TableRow>
            )}
            renderSpeedDial={({ onAdd }) => (
                <SpeedDialAction
                    component={Link}
                    to="new"
                    tooltipTitle="Добавить автора"
                    icon={<AddIcon/>}
                    onClick={onAdd}
                    title="Добавить автора"
                />
            )}
        />
    );
}

AuthorList.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    authors: PropTypes.array.isRequired,
    fetchAuthors: PropTypes.func.isRequired,
    deleteAuthor: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
};

export default hot(AuthorList);
