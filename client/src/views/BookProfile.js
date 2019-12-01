/** @jsx jsx */

import { css, Global, jsx } from "@emotion/core";
import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Close as CloseIcon, Edit, MoreVert as MoreVertIcon } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Skeleton from "@material-ui/lab/Skeleton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import * as PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const styles = {
    flex1: css`
        flex: 1;
    `,
    global: css`
        body {
            padding-right: 0 !important;
        }
    `,
    loader: css`
        justify-content: center;
        align-items: center;
    `,
    fieldTitle: css`
        display: flex;
        align-items: center;
    `,
    dialog: css`
        padding: 48px;
    `,
};

export default function BookProfile(props) {
    const {
        id,
        book,
        editing,
        fetchBook,
        loading,
        startEditing,
        stopEditing,
        handleChange,
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        fetchBook(id);
    }, [fetchBook, id]);

    const handleMenuClick = event => setAnchorEl(event.currentTarget);

    const handleMenuClose = () => setAnchorEl(null);

    const handleClose = () => window.history.back();

    const handleEntering = () => window.scrollTo(0, 0);

    const handleEditClick = () => {
        handleMenuClose();
        if (!editing) {
            startEditing();
        }
    };

    const handleSave = () => {
        handleMenuClose();
        handleClose();
        stopEditing();
    };

    const handleFieldChange = name => value => handleChange({ ...book, [name]: value });

    return (
        <Dialog
            open
            onClose={handleClose}
            onEntering={handleEntering}
            scroll="paper"
            transitionDuration={0}
        >
            <Global styles={styles.global} />
            <AppBar position="static">
                <Toolbar>
                    {loading ? (
                        <Grid css={styles.flex1}>
                            <Skeleton variant="rect" width={220} height={32} />
                        </Grid>
                    ) : (
                        <Typography variant="h6" css={styles.flex1}>
                            Книга №{book?.id_book}
                        </Typography>
                    )}
                    <IconButton color="inherit" onClick={handleMenuClick}>
                        <MoreVertIcon />
                    </IconButton>
                    <IconButton edge="end" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent dividers={true} css={styles.dialog}>
                {loading ? (
                    <Grid container spacing={2}>
                        <Grid item>
                            <Skeleton variant="rect" width={440} height={32} />
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rect" width={440} height={32} />
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rect" width={440} height={32} />
                        </Grid>
                        <Grid item>
                            <Skeleton variant="rect" width={440} height={32} />
                        </Grid>
                    </Grid>
                ) : (
                    <form noValidate autoComplete="off">
                        <Grid container spacing={4}>
                            <BookField
                                title="Название"
                                value={book?.title}
                                readOnly={!editing}
                                onChange={handleFieldChange("title")}
                            />
                            <BookField
                                title="Год"
                                value={book?.year}
                                readOnly={!editing}
                                onChange={handleFieldChange("year")}
                            />
                            <BookField
                                title="Цена"
                                value={book?.cost}
                                readOnly={!editing}
                                onChange={handleFieldChange("cost")}
                            />
                        </Grid>
                    </form>
                )}
            </DialogContent>
            {editing && (
                <DialogActions>
                    <Button color="primary" variant="contained" onClick={handleSave}>
                        Сохранить
                    </Button>
                </DialogActions>
            )}
            <Menu
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditClick}>
                    <ListItemIcon fontSize="small">
                        <Edit />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                        Редактировать
                    </Typography>
                </MenuItem>
            </Menu>
        </Dialog>
    );
}

BookProfile.propTypes = {
    loading: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    book: PropTypes.shape({
        id_book: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        cost: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
    }),
    fetchBook: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    stopEditing: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

function BookField(props) {
    const { value, readOnly, onChange, title } = props;

    const handleChange = event => onChange(event.target.value);

    return (
        <React.Fragment>
            <Grid item sm={2} css={styles.fieldTitle}>
                <Typography variant="body2">{title}</Typography>
            </Grid>
            <Grid item sm={10}>
                {readOnly ? (
                    <TextField placeholder={title} defaultValue={value} InputProps={{ readOnly }} />
                ) : (
                    <TextField placeholder={title} value={value} onChange={handleChange} />
                )}
            </Grid>
        </React.Fragment>
    );
}

BookField.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    readOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};
