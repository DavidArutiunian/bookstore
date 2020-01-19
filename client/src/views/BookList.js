import TableCell from "@material-ui/core/TableCell";
import React from "react";
import { Link, navigate, Router } from "@reach/router";
import BookProfile from "containers/book/profile";
import { Delete as DeleteIcon, LibraryAdd as AddIcon } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import BaseList from "components/BaseList";
import TableRow from "components/TableRow";
import DeleteTableCell from "components/DeleteTableCell";
import useOrder from "hooks/use-order";
import Search from "components/Search";
import { hot } from "react-hot-loader/root";
import PropTypes from "prop-types";
import { css } from "@emotion/core";
import Grid from "@material-ui/core/Grid";
import useFilter from "hooks/use-filter";

const styles = {
    search: css`
        padding: 24px 24px 0;
    `,
};

function BookList(props) {
    const {
        fetchBooks,
        books,
        loading,
        deleteBook,
        startEditing,
        error,
        authors,
        fetchBooksAndAuthors,
    } = props;

    const [order, toggleOrder] = useOrder(fetchBooks);
    const [, changeFilter] = useFilter(order, fetchBooks);

    return (
        <BaseList
            renderTableToolbar={() => (
                <Grid css={styles.search}>
                    <Search onChange={changeFilter} />
                </Grid>
            )}
            order={order}
            onOrderToggle={toggleOrder}
            loading={loading}
            error={error}
            columns={[
                {
                    label: "Номер",
                    value: "id_book",
                    sortable: true,
                },
                {
                    label: "Название",
                    value: "title",
                    sortable: true,
                },
                {
                    label: "Год",
                    value: "year",
                    sortable: true,
                },
                {
                    label: "Автор(ы)",
                    value: "authors",
                    sortable: false,
                },
                {
                    label: "Цена",
                    value: "cost",
                    sortable: true,
                },
            ]}
            items={books}
            deleteItem={deleteBook}
            fetchList={fetchBooksAndAuthors}
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
            renderTableRow={({ item: book, onDelete }) => {
                return (
                    <TableRow key={book.id_book} onClick={() => navigate(`/book/${book.id_book}`)}>
                        <TableCell>{book.id_book}</TableCell>
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.year}</TableCell>
                        <TableCell>
                            {authors
                                ?.filter(author => book?.authors?.includes(author.id_author))
                                ?.map(author => (
                                    <React.Fragment key={author.id_author}>
                                        {author.name} {author.surname}
                                        <br />
                                    </React.Fragment>
                                ))}
                        </TableCell>
                        <TableCell>{book.cost}</TableCell>
                        <DeleteTableCell>
                            <IconButton onClick={onDelete(book.id_book)}>
                                <DeleteIcon />
                            </IconButton>
                        </DeleteTableCell>
                    </TableRow>
                );
            }}
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
    authors: PropTypes.array,
    fetchBooks: PropTypes.func.isRequired,
    fetchBooksAndAuthors: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
};

export default hot(BookList);
