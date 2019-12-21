/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import useForm from "react-hook-form";
import Input from "./Input";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { InputLabel } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputError from "./InputError";
import PropTypes from "prop-types";

export default function AuthBase(props) {
    const { children, onSubmit } = props;
    const { handleSubmit, register, errors } = useForm();

    const doOnSubmit = values => {
        if (onSubmit) {
            onSubmit(values.login, values.password);
        }
    };

    return (
        <form
            css={css`
                width: 200px;
                height: 200px;
                align-content: center;
            `}
            autoComplete="off"
            onSubmit={handleSubmit(doOnSubmit)}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl>
                        <InputLabel htmlFor="login">Логин</InputLabel>
                        <Input
                            id="login"
                            name="login"
                            ref={register({
                                required: "Обязательно для заполнения",
                                minLength: 4,
                            })}
                        />
                        {errors.login && (
                            <InputError
                                message={
                                    errors.login.type === "minLength"
                                        ? "Недостаточно символов"
                                        : errors.login.message
                                }
                            />
                        )}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl>
                        <InputLabel htmlFor="password">Пароль</InputLabel>
                        <Input
                            id="password"
                            name="password"
                            ref={register({
                                required: "Обязательно для заполнения",
                                minLength: 4,
                            })}
                        />
                        {errors.password && (
                            <InputError
                                message={
                                    errors.password.type === "minLength"
                                        ? "Недостаточно символов"
                                        : errors.password.message
                                }
                            />
                        )}
                    </FormControl>
                </Grid>
                <Grid
                    css={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 24px;
                    `}
                    item
                    xs={12}
                >
                    <Button variant="contained" color="primary" type="submit">
                        {children}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

AuthBase.propTypes = {
    onSubmit: PropTypes.func,
};
