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

function AuthorList(props) {
    const { fetchAuthors, authors, loading, deleteAuthor, startEditing, error } = props;

    return (
        <BaseList
            loading={loading}
            error={error}
            columns={["Имя", "Фамилия", "Дата рождения", "Издательский дом"]}
            items={authors}
            deleteItem={deleteAuthor}
            fetchList={fetchAuthors}
            startEditing={startEditing}
            renderRouter={() => <Router />}
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
                            <DeleteIcon />
                        </IconButton>
                    </DeleteTableCell>
                </TableRow>
            )}
            renderSpeedDial={({ onAdd }) => (
                <SpeedDialAction
                    component={Link}
                    to="new"
                    tooltipTitle="Добавить автора"
                    icon={<AddIcon />}
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
