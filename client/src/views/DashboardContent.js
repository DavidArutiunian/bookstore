import Paper from "@material-ui/core/Paper";
import React from "react";
import { hot } from "react-hot-loader/root";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Grid from "@material-ui/core/Grid";
import { ResponsiveBar } from "@nivo/bar";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const styles = {
    title: css`
        margin: 24px 24px 16px;
    `,
    paper: css`
        height: 600px;
        width: 100%;
    `,
};

function DashboardContent(props) {
    const { topMostActiveUsers, topMostPopularBooks } = props;

    return (
        <Container container spacing={4}>
            <Grid item xs={12}>
                <Paper>
                    <Grid container>
                        <Grid item xs={12} css={styles.title}>
                            <Typography align="center" variant="body1">
                                Самыe популярные книги
                            </Typography>
                        </Grid>
                        <Grid item xs={12} css={styles.paper}>
                            <ResponsiveBar
                                data={topMostPopularBooks.map(book => ({
                                    id: book.title,
                                    value: book.orders_count,
                                }))}
                                margin={{ top: 0, right: 32, bottom: 64, left: 72 }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    orient: "bottom",
                                    tickSize: 0,
                                    tickPadding: 12,
                                    tickRotation: 0,
                                    legend: "Книга",
                                    legendOffset: 40,
                                    legendPosition: "middle",
                                }}
                                axisLeft={{
                                    orient: "left",
                                    tickSize: 0,
                                    tickPadding: 16,
                                    tickRotation: 0,
                                    legend: "Количество заказов",
                                    legendOffset: -48,
                                    legendPosition: "middle",
                                }}
                                tooltip={({ data }) => data.id}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <Grid container>
                        <Grid item xs={12} css={styles.title}>
                            <Typography align="center" variant="body1">
                                Самые активные покупатели
                            </Typography>
                        </Grid>
                        <Grid item xs={12} css={styles.paper}>
                            <ResponsiveBar
                                data={topMostActiveUsers.map(user => ({
                                    id: user.name,
                                    value: user.orders_count,
                                }))}
                                margin={{ top: 0, right: 32, bottom: 64, left: 72 }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    orient: "bottom",
                                    tickSize: 0,
                                    tickPadding: 12,
                                    tickRotation: 0,
                                    legend: "Пользователь",
                                    legendOffset: 40,
                                    legendPosition: "middle",
                                }}
                                axisLeft={{
                                    orient: "left",
                                    tickSize: 0,
                                    tickPadding: 16,
                                    tickRotation: 0,
                                    legend: "Количество заказов",
                                    legendOffset: -48,
                                    legendPosition: "middle",
                                }}
                                tooltip={({ data }) => data.id}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Container>
    );
}

DashboardContent.propTypes = {
    topMostActiveUsers: PropTypes.arrayOf(
        PropTypes.shape({
            id_customer: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            orders_count: PropTypes.number.isRequired,
        }),
    ).isRequired,
    topMostPopularBooks: PropTypes.arrayOf(
        PropTypes.shape({
            id_book: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            orders_count: PropTypes.number.isRequired,
        }),
    ).isRequired,
};

export default hot(DashboardContent);

const Container = styled(Grid)`
    padding: 16px;
    width: 100% !important;
    margin: 0;
`;
