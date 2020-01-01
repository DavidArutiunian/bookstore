import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { RHFInput } from "react-hook-form-input";
import Input from "components/Input";
import * as PropTypes from "prop-types";
import styled from "@emotion/styled";
import { hot } from "react-hot-loader/root";
import InputErrorFactory from "factory/InputErrorFactory";

const ProfileInput = props => {
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
            <ProfileFieldTitle item sm={3}>
                <Typography variant="body2">{title}</Typography>
            </ProfileFieldTitle>
            <Grid item sm={9}>
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
                        {InputErrorFactory.create(errors, name)}{" "}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

ProfileInput.propTypes = {
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

export default hot(ProfileInput);

const ProfileFieldTitle = styled(Grid)`
    display: flex;
    align-items: center;
`;
