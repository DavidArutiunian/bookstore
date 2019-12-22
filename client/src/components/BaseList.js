import { css } from "@emotion/core";
import { Table } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Layout from "components/Layout";
import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import { hot } from "react-hot-loader/root";
import styled from "@emotion/styled";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";

const styles = {
    layout: css`
        padding: 24px;
    `,
    paper: css`
        height: max-content;
        width: 100%;
    `,
    speedDial: css`
        right: 24px;
        bottom: 24px;
        position: fixed;
    `,
};

function BaseList(props) {
    const {
        fetchList,
        items,
        loading,
        deleteItem,
        startEditing,
        columns,
        renderTableRow,
        renderRouter,
        renderSpeedDial,
    } = props;

    const [speedDialOpen, setSpeedDialOpen] = useState(false);

    useEffect(() => {
        fetchList();
    }, [fetchList]);

    const handleDeleteClick = id => event => {
        event.preventDefault();
        event.stopPropagation();
        deleteItem(id);
    };

    const handleSpeedDialOpen = () => {
        setSpeedDialOpen(true);
    };

    const handleSpeedDialClose = () => {
        setSpeedDialOpen(false);
    };

    const handleAddItem = () => {
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
                                {columns.map(column => (
                                    <HeaderTableCell key={column}>{column}</HeaderTableCell>
                                ))}
                                <HeaderTableCell />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map(item =>
                                renderTableRow({ item, onDelete: handleDeleteClick }),
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            )}
            {renderRouter()}
            <SpeedDial
                css={styles.speedDial}
                ariaLabel=""
                direction="up"
                icon={<SpeedDialIcon />}
                open={speedDialOpen}
                onOpen={handleSpeedDialOpen}
                onClose={handleSpeedDialClose}
            >
                {renderSpeedDial({ onAdd: handleAddItem })}
            </SpeedDial>
        </Layout>
    );
}

BaseList.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.string).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    items: PropTypes.array.isRequired,
    fetchList: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    renderTableRow: PropTypes.func.isRequired,
    renderRouter: PropTypes.func.isRequired,
    renderSpeedDial: PropTypes.func.isRequired,
};

export default hot(BaseList);

const HeaderTableCell = styled(TableCell)`
    font-weight: 600;
`;

const ProgressLayout = styled(Layout)`
    justify-content: center;
    align-items: center;
`;
