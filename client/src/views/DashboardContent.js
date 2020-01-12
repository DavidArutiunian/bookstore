import Paper from "@material-ui/core/Paper";
import React from "react";
import { hot } from "react-hot-loader/root";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Grid from "@material-ui/core/Grid";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import Typography from "@material-ui/core/Typography";

const offers = [
    {
        id: 0,
        data: range(0, 30).map(i => ({
            x: i + 1,
            y: Math.floor(Math.random() * 100 + 25),
        })),
    },
];

const users = [
    {
        id: "Дарья Щеглова",
        value: Math.floor(Math.random() * 100 + 25),
    },
    {
        id: "Давид Арутюнян",
        value: Math.floor(Math.random() * 100 + 25),
    },
    {
        id: "admin",
        value: Math.floor(Math.random() * 100 + 25),
    },
].sort((a, b) => b.value - a.value);

const styles = {
    title: css`
        margin: 24px 24px 16px;
    `,
    paper: css`
        height: 600px;
        width: 100%;
    `,
};

function DashboardContent() {
    return (
        <Container container spacing={4}>
            <Grid item xs={12}>
                <Paper>
                    <Grid container>
                        <Grid item xs={12} css={styles.title}>
                            <Typography align="center" variant="body1">
                                Количество заказов за месяц
                            </Typography>
                        </Grid>
                        <Grid item xs={12} css={styles.paper}>
                            <ResponsiveLine
                                data={offers}
                                margin={{ top: 0, right: 32, bottom: 64, left: 72 }}
                                xScale={{ type: "point" }}
                                yScale={{
                                    type: "linear",
                                    min: 0,
                                    max: 150,
                                    stacked: true,
                                    reverse: false,
                                }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    orient: "bottom",
                                    tickSize: 0,
                                    tickPadding: 12,
                                    tickRotation: 0,
                                    legend: "Заказы за Январь",
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
                                pointSize={8}
                                pointColor={{ from: "color" }}
                                pointBorderWidth={2}
                                pointBorderColor={{ from: "color" }}
                                pointLabel="y"
                                pointLabelYOffset={-12}
                                useMesh={true}
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
                                data={users}
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
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Container>
    );
}

export default hot(DashboardContent);

const Container = styled(Grid)`
    padding: 16px;
    width: 100% !important;
    margin: 0;
`;

function range(start, end) {
    return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
}
