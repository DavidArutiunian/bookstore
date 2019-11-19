/** @jsx jsx */

import { jsx, css } from "@emotion/core";
import { Table } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Layout from "components/Layout";
import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";

const styles = {
    fw600: css`
        font-weight: 600;
    `,
};

export default function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/books`)
            .then(async response => {
                if (!response.ok) {
                    return console.error(response.statusText);
                }
                const json = await response.json();
                setBooks(json);
            })
            .catch(console.error);
    }, []);

    return (
        <Layout
            css={css`
                padding: 24px;
            `}
        >
            <Paper
                css={css`
                    width: 100%;
                `}
            >
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
                                css={css`
                                    cursor: pointer;

                                    :hover {
                                        background: #eeeeee;
                                    }
                                `}
                                key={book.id_book}
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
        </Layout>
    );
}
