/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { Table } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Layout from "components/Layout";
import { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { Link, Router } from "@reach/router";
import BookProfile from "views/BookProfile";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
    fw600: css`
        font-weight: 600;
    `,
    layout: css`
        padding: 24px;
    `,
    paper: css`
        width: 100%;
    `,
    tableRow: css`
        cursor: pointer;
        text-decoration: none;

        :hover {
            background: #eeeeee;
        }
    `,
    progressLayout: css`
        justify-content: center;
        align-items: center;
    `,
};

export default function BookList(props) {
    const { fetchBooks, books, loading } = props;

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <Layout css={styles.layout}>
            {loading ? (
                <Layout css={styles.progressLayout}>
                    <CircularProgress />
                </Layout>
            ) : (
                <Paper css={styles.paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell css={styles.fw600}>Номер</TableCell>
                                <TableCell css={styles.fw600}>Название</TableCell>
                                <TableCell css={styles.fw600}>Год</TableCell>
                                <TableCell css={styles.fw600}>Цена</TableCell>
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
