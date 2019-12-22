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
import useForm from "react-hook-form";
import InputError from "components/InputError";
import Input from "components/Input";
import { RHFInput } from "react-hook-form-input";

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

function BookProfile(props) {
    const {
        id,
        book,
        editing,
        fetchBook,
        loading,
        startEditing,
        stopEditingAndSave,
        handleChange,
        customTitle,
        shouldFetchBook = true,
        showOptions = true,
        stopEditingAndCreate,
        shouldCreate = false,
        justStopEditing,
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const { handleSubmit, register, errors, setValue } = useForm();

    useEffect(() => {
        if (shouldFetchBook) {
            fetchBook(id);
        }
    }, [fetchBook, id, shouldFetchBook]);

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
        const { title, year, cost } = book;
        if (shouldCreate) {
            stopEditingAndCreate({ title, year, cost });
        } else {
            stopEditingAndSave(id, { title, year, cost });
        }
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
                        <SkeletonLayout>
                            <Skeleton variant="rect" width={220} height={32} />
                        </SkeletonLayout>
                    ) : (
                        <BookTitle variant="h6">
                            {customTitle ? (
                                typeof customTitle === "function" ? (
                                    customTitle()
                                ) : (
                                    customTitle
                                )
                            ) : (
                                <>Книга №{book?.id_book}</>
                            )}
                        </BookTitle>
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
                                rules={{ required: "Обязательно для заполнения" }}
                                register={register}
                                setValue={setValue}
                                errors={errors}
                                name="title"
                                title="Название"
                                value={book?.title}
                                readOnly={!editing}
                                onChange={handleFieldChange("title")}
                            />
                            <BookField
                                rules={{
                                    required: "Обязательно для заполнения",
                                    pattern: /^\d{4}$/,
                                }}
                                register={register}
                                setValue={setValue}
                                type="number"
                                errors={errors}
                                name="year"
                                title="Год"
                                value={book?.year}
                                readOnly={!editing}
                                onChange={handleFieldChange("year")}
                            />
                            <BookField
                                rules={{
                                    required: "Обязательно для заполнения",
                                    pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                                }}
                                register={register}
                                setValue={setValue}
                                type="number"
                                errors={errors}
                                name="cost"
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

BookProfile.propTypes = {
    shouldCreate: PropTypes.bool,
    customTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    showOptions: PropTypes.bool,
    shouldFetchBook: PropTypes.bool,
    loading: PropTypes.bool.isRequired,
    editing: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    book: PropTypes.shape({
        id_book: PropTypes.string,
        title: PropTypes.string,
        cost: PropTypes.string,
        year: PropTypes.number,
    }),
    fetchBook: PropTypes.func.isRequired,
    startEditing: PropTypes.func.isRequired,
    stopEditingAndSave: PropTypes.func.isRequired,
    stopEditingAndCreate: PropTypes.func.isRequired,
    justStopEditing: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
};

const BookField = props => {
    const {
        value,
        readOnly,
        onChange,
        title,
        name,
        errors = {},
        type,
        register,
        rules,
        setValue,
    } = props;

    const handleChange = event => onChange(event.target.value);

    return (
        <React.Fragment>
            <BookFieldTitle item sm={2}>
                <Typography variant="body2">{title}</Typography>
            </BookFieldTitle>
            <Grid item sm={10}>
                <Grid container>
                    <Grid item sm={12}>
                        {readOnly ? (
                            <RHFInput
                                name={name}
                                register={register}
                                defaultValue={value}
                                as={<Input type={type} placeholder={title} readOnly={readOnly} />}
                                rules={rules}
                                setValue={setValue}
                            />
                        ) : (
                            <RHFInput
                                name={name}
                                value={value}
                                register={register}
                                as={<Input type={type} placeholder={title} />}
                                rules={rules}
                                setValue={setValue}
                                onChange={handleChange}
                            />
                        )}
                    </Grid>
                    <Grid item sm={12}>
                        {errors[name] && (
                            <InputError
                                message={
                                    errors[name].type === "minLength"
                                        ? "Недостаточно символов"
                                        : errors[name].type === "maxLength"
                                        ? "Превышено максимальное количество символов"
                                        : errors[name].type === "pattern"
                                        ? "Неверный формат поля"
                                        : errors[name].message
                                }
                            />
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

BookField.propTypes = {
    errors: PropTypes.object,
    rules: PropTypes.object,
    register: PropTypes.func.isRequired,
    type: PropTypes.string,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    readOnly: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default hot(BookProfile);

const SkeletonLayout = styled(Grid)`
    flex: 1;
`;

const BookTitle = styled(Typography)`
    flex: 1;
`;

const BookFieldTitle = styled(Grid)`
    display: flex;
    align-items: center;
`;
