import { css } from "@emotion/core";
import { Table } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Layout from "components/Layout";
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { Link, Router } from "@reach/router";
import BookProfile from "containers/book-profile";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { hot } from "react-hot-loader/root";
import styled from "@emotion/styled";
import { LibraryAdd as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";

const styles = {
    layout: css`
        padding: 24px;
    `,
    paper: css`
        height: max-content;
        width: 100%;
    `,
    tableRow: css`
        cursor: pointer;
        text-decoration: none;

        :hover {
            background: #eeeeee;
        }
    `,
    speedDial: css`
        right: 24px;
        bottom: 24px;
        position: fixed;
    `,
};

function BookList(props) {
    const { fetchBooks, books, loading, deleteBook, startEditing } = props;

    const [speedDialOpen, setSpeedDialOpen] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const handleDeleteClick = id => event => {
        event.preventDefault();
        event.stopPropagation();
        deleteBook(id);
    };

    const handleSpeedDialOpen = () => {
        setSpeedDialOpen(true);
    };

    const handleSpeedDialClose = () => {
        setSpeedDialOpen(false);
    };

    const handleAddBook = () => {
        handleSpeedDialClose();
        startEditing();
    };

    return (
        <Layout css={styles.layout}>
            {loading ? (
                <ProgressLayout>
                    <CircularProgress />
                </ProgressLayout>
            ) : (
                <Paper css={styles.paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <HeaderTableCell>Номер</HeaderTableCell>
                                <HeaderTableCell>Название</HeaderTableCell>
                                <HeaderTableCell>Год</HeaderTableCell>
                                <HeaderTableCell>Цена</HeaderTableCell>
                                <HeaderTableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map(book => (
                                <TableRow
                                    component={Link}
                                    css={styles.tableRow}
                                    key={book.id_book}
                                    to={`${book.id_book}`}
                                >
                                    <TableCell>{book.id_book}</TableCell>
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.year}</TableCell>
                                    <TableCell>{book.cost}</TableCell>
                                    <DeleteTableCell>
                                        <IconButton onClick={handleDeleteClick(book.id_book)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </DeleteTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
            <Router>
                <BookProfile
                    customTitle="Новая книга"
                    shouldFetchBook={false}
                    showTitle={false}
                    showOptions={false}
                    shouldCreate={true}
                    path="new"
                />
                <BookProfile path=":id" />
            </Router>
            <SpeedDial
                css={styles.speedDial}
                ariaLabel="create_book"
                direction="up"
                icon={<SpeedDialIcon />}
                open={speedDialOpen}
                onOpen={handleSpeedDialOpen}
                onClose={handleSpeedDialClose}
            >
                <SpeedDialAction
                    component={Link}
                    to="new"
                    tooltipTitle="Добавить книгу"
                    icon={<AddIcon />}
                    onClick={handleAddBook}
                />
            </SpeedDial>
        </Layout>
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

const HeaderTableCell = styled(TableCell)`
    font-weight: 600;
`;

const ProgressLayout = styled(Layout)`
    justify-content: center;
    align-items: center;
`;

const DeleteTableCell = styled(TableCell)`
    padding: 0;
`;
