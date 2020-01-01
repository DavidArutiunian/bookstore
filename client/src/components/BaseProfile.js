import { css, Global } from "@emotion/core";
import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { Close as CloseIcon, Edit, MoreVert as MoreVertIcon } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import * as PropTypes from "prop-types";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { hot } from "react-hot-loader/root";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

const styles = {
    global: css`
        body {
            padding-right: 0 !important;
        }
    `,
    dialog: css`
        padding: 48px;
    `,
};

function BaseProfile(props) {
    const {
        id,
        item,
        editing,
        fetchItem,
        loading,
        startEditing,
        stopEditingAndSave,
        handleChange,
        renderTitle,
        shouldFetchItem = true,
        showOptions = true,
        stopEditingAndCreate,
        shouldCreate = false,
        justStopEditing,
        renderFields,
        skeleton,
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const { handleSubmit, register, errors, setValue } = useForm();

    useEffect(() => {
        if (shouldFetchItem) {
            fetchItem(id);
        }
    }, [fetchItem, id, shouldFetchItem]);

    const handleMenuClick = event => setAnchorEl(event.currentTarget);

    const handleMenuClose = () => setAnchorEl(null);

    const handleClose = () => {
        window.history.back();
        justStopEditing();
    };

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
        if (shouldCreate) {
            stopEditingAndCreate({ ...item });
        } else {
            stopEditingAndSave(id, { ...item });
        }
    };

    const handleFieldChange = name => value => handleChange({ ...item, [name]: value });

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
                        <SkeletonLayout>
                            <Skeleton variant="rect" width={220} height={32} />
                        </SkeletonLayout>
                    ) : (
                        <ProfileTitle variant="h6">{renderTitle()}</ProfileTitle>
                    )}
                    {showOptions && (
                        <IconButton color="inherit" onClick={handleMenuClick}>
                            <MoreVertIcon />
                        </IconButton>
                    )}
                    <IconButton edge="end" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent dividers={true} css={styles.dialog}>
                {loading ? (
                    <Grid container spacing={2}>
                        {skeleton.map(field => (
                            <Grid key={field} item>
                                <Skeleton variant="rect" width={440} height={32} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <form noValidate autoComplete="off">
                        <Grid container spacing={4}>
                            {renderFields({
                                register,
                                setValue,
                                errors,
                                editing,
                                handleFieldChange,
                            })}
                        </Grid>
                    </form>
                )}
            </DialogContent>
            {editing && (
                <DialogActions>
                    <Button color="primary" variant="contained" onClick={handleSubmit(handleSave)}>
                        Сохранить
                    </Button>
                </DialogActions>
            )}
            {showOptions && (
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
            )}
        </Dialog>
    );
}

BaseProfile.propTypes = {
    item: PropTypes.object,
    id: PropTypes.string,
    skeleton: PropTypes.arrayOf(PropTypes.string).isRequired,
    renderFields: PropTypes.func.isRequired,
    shouldCreate: PropTypes.bool,
    renderTitle: PropTypes.func.isRequired,
    showOptions: PropTypes.bool,
    shouldFetchItem: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    fetchItem: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    stopEditingAndSave: PropTypes.func.isRequired,
    stopEditingAndCreate: PropTypes.func.isRequired,
    justStopEditing: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default hot(BaseProfile);

const SkeletonLayout = styled(Grid)`
    flex: 1;
`;

const ProfileTitle = styled(Typography)`
    flex: 1;
`;
