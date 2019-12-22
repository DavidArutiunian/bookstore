import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { RHFInput } from "react-hook-form-input";
import Input from "components/Input";
import InputError from "components/InputError";
import * as PropTypes from "prop-types";
import styled from "@emotion/styled";
import { hot } from "react-hot-loader/root";

const ProfileField = props => {
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
        <>
            <ProfileFieldTitle item sm={2}>
                <Typography variant="body2">{title}</Typography>
            </ProfileFieldTitle>
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
        </>
    );
};

ProfileField.propTypes = {
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

export default hot(ProfileField);

const ProfileFieldTitle = styled(Grid)`
    display: flex;
    align-items: center;
`;
