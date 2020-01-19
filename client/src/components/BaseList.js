import { css } from "@emotion/core";
import { Table } from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Layout from "components/Layout";
import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";
import styled from "@emotion/styled";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { useMount } from "react-use";
import { Sort } from "hooks/use-order";

const styles = {
    layout: css`
        padding: 24px;
    `,
    paper: css`
        height: max-content;
        width: 100%;
    `,
    menu: css`
        right: 24px;
        bottom: 24px;
        position: fixed;
    `,
    header: css`
        display: flex;
        align-items: center;
    `,
};

function BaseList(props) {
    const {
        fetchList,
        items = [],
        deleteItem,
        startEditing,
        columns,
        renderTableRow,
        renderRouter,
        renderSpeedDial,
        order = {},
        onOrderToggle,
        renderTableToolbar,
    } = props;

    const [speedDialOpen, setSpeedDialOpen] = useState(false);

    useMount(() => fetchList());

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
            <Paper css={styles.paper}>
                {renderTableToolbar && renderTableToolbar()}
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map(({ label, value, sortable }) => (
                                <HeaderTableCell
                                    key={value}
                                    onClick={sortable ? onOrderToggle(value) : undefined}
                                >
                                    <div css={styles.header}>
                                        {label}
                                        {order[value] === Sort.Asc && <ArrowDropUp />}
                                        {order[value] === Sort.Desc && <ArrowDropDown />}
                                    </div>
                                </HeaderTableCell>
                            ))}
                            <HeaderTableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map(item => renderTableRow({ item, onDelete: handleDeleteClick }))}
                    </TableBody>
                </Table>
            </Paper>
            {renderRouter()}
            <SpeedDial
                css={styles.menu}
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
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
            sortable: PropTypes.bool,
        }),
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    items: PropTypes.array.isRequired,
    fetchList: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    renderTableRow: PropTypes.func.isRequired,
    renderRouter: PropTypes.func.isRequired,
    renderSpeedDial: PropTypes.func.isRequired,
    order: PropTypes.object,
    onOrderToggle: PropTypes.func,
    renderTableToolbar: PropTypes.func,
};

export default hot(BaseList);

const HeaderTableCell = styled(TableCell)`
    font-weight: 600;
    cursor: pointer;
    user-select: none;
`;
