/** @jsx jsx */

import { css, Global, jsx } from "@emotion/core";
import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import ky from "ky";
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
    const { id } = props;

    const [book, setBook] = useState(null);
    const [editing, setEditing] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        ky.get(`${process.env.REACT_APP_API}/books/${id}`)
            .then(response => response.json())
            .then(json => setBook(json))
            .catch(console.error);
    }, [id]);

    const handleMenuClick = event => setAnchorEl(event.currentTarget);

    const handleMenuClose = () => setAnchorEl(null);

    const handleClose = () => window.history.back();

    const handleEntering = () => window.scrollTo(0, 0);

    const handleEditClick = () => {
        handleMenuClose();
        setEditing(true);
    };

    const handleSave = () => {
        handleMenuClose();
        handleClose();
        setEditing(false);
    };

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
                    {book ? (
                        <Typography variant="h6" css={styles.flex1}>
                            Книга №{book.id_book}
                        </Typography>
                    ) : (
                        <Grid css={styles.flex1}>
                            <Skeleton variant="rect" width={220} height={32} />
                        </Grid>
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
                {!book && (
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
                )}
                {book && (
                    <form noValidate autoComplete="off">
                        <Grid container spacing={4}>
                            <BookField title="Название" defaultValue={book?.title} readOnly />
                            <BookField title="Год" defaultValue={book?.year} readOnly />
                            <BookField title="Цена" defaultValue={book?.title} readOnly />
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

function BookField(props) {
    const { defaultValue, readOnly, title } = props;

    return (
        <React.Fragment>
            <Grid item sm={2} css={styles.fieldTitle}>
                <Typography variant="body2">{title}</Typography>
            </Grid>
            <Grid item sm={10}>
                <TextField
                    placeholder={title}
                    defaultValue={defaultValue}
                    InputProps={{ readOnly }}
                />
            </Grid>
        </React.Fragment>
    );
}

BookField.propTypes = {
    title: PropTypes.string.isRequired,
    defaultValue: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    readOnly: PropTypes.bool,
};
