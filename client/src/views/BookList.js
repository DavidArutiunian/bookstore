import { css } from "@emotion/core";
import { Table } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Layout from "components/Layout";
import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { Link, Router } from "@reach/router";
import BookProfile from "containers/book-profile";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { hot } from "react-hot-loader/root";
import styled from "@emotion/styled";

const styles = {
    layout: css`
        padding: 24px;
    `,
    paper: css`
        height: max-content;
        width: 100%;
    `,
    row: css`
        cursor: pointer;
        text-decoration: none;

        :hover {
            background: #eeeeee;
        }
    `,
};

function BookList(props) {
    const { fetchBooks, books, loading } = props;

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.map(book => (
                                <TableRow
                                    component={Link}
                                    css={styles.row}
                                    key={book.id_book}
                                    to={`${book.id_book}`}
                                >
                                    <TableCell>{book.id_book}</TableCell>
                                    <TableCell>{book.title}</TableCell>
                                    <TableCell>{book.year}</TableCell>
                                    <TableCell>{book.cost}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            )}
            <Router>
                <BookProfile path=":id" />
            </Router>
        </Layout>
    );
}

BookList.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    books: PropTypes.array.isRequired,
    fetchBooks: PropTypes.func.isRequired,
};

export default hot(BookList);

const HeaderTableCell = styled(TableCell)`
    font-weight: 600;
`;

const ProgressLayout = styled(Layout)`
    justify-content: center;
    align-items: center;
`;
