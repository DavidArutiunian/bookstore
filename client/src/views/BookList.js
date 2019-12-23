import TableCell from "@material-ui/core/TableCell";
import React from "react";
import { Link, navigate, Router } from "@reach/router";
import BookProfile from "containers/book/profile";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import { Delete as DeleteIcon, LibraryAdd as AddIcon } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import BaseList from "components/BaseList";
import TableRow from "components/TableRow";
import DeleteTableCell from "components/DeleteTableCell";

function BookList(props) {
    const { fetchBooks, books, loading, deleteBook, startEditing, error } = props;

    return (
        <BaseList
            loading={loading}
            error={error}
            columns={["Номер", "Название", "Год", "Цена"]}
            items={books}
            deleteItem={deleteBook}
            fetchList={fetchBooks}
            startEditing={startEditing}
            renderRouter={() => (
                <Router>
                    <BookProfile
                        path="new"
                        customTitle="Новая книга"
                        shouldFetchBook={false}
                        showTitle={false}
                        showOptions={false}
                        shouldCreate={true}
                    />
                    <BookProfile path=":id" />
                </Router>
            )}
            renderTableRow={({ item: book, onDelete }) => (
                <TableRow key={book.id_book} onClick={() => navigate(`/book/${book.id_book}`)}>
                    <TableCell>{book.id_book}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.year}</TableCell>
                    <TableCell>{book.cost}</TableCell>
                    <DeleteTableCell>
                        <IconButton onClick={onDelete(book.id_book)}>
                            <DeleteIcon />
                        </IconButton>
                    </DeleteTableCell>
                </TableRow>
            )}
            renderSpeedDial={({ onAdd }) => (
                <SpeedDialAction
                    component={Link}
                    to="new"
                    tooltipTitle="Добавить книгу"
                    icon={<AddIcon />}
                    onClick={onAdd}
                    title="Добавить книгу"
                />
            )}
        />
    );
}

BookList.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    books: PropTypes.array.isRequired,
    fetchBooks: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
};

export default hot(BookList);
