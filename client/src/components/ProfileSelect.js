import React from "react";
import Grid from "@material-ui/core/Grid";
import { RHFInput } from "react-hook-form-input";
import * as PropTypes from "prop-types";
import styled from "@emotion/styled";
import { hot } from "react-hot-loader/root";
import { Select } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import InputErrorFactory from "factory/InputErrorFactory";

const ProfileSelect = props => {
    const { value, options, onChange, errors, title, name, register, rules, setValue } = props;

    const handleChange = event => onChange(event.target.value);

    return (
        <>
            <Grid item sm={12}>
                <Grid container>
                    <Grid item sm={12}>
                        <FullWidthFormControl>
                            <InputLabel id={`label-${name}`}>{title}</InputLabel>
                            <RHFInput
                                name={name}
                                value={`${value}`}
                                register={register}
                                as={
                                    <Select labelId={`label-${name}`}>
                                        {options.map(({ label, value }) => (
                                            <MenuItem key={label} value={value}>
                                                {label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                }
                                rules={rules}
                                setValue={setValue}
                                onChange={handleChange}
                            />
                        </FullWidthFormControl>
                    </Grid>
                    <Grid item sm={12}>
                        {InputErrorFactory.create(errors, name)}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

ProfileSelect.propTypes = {
    errors: PropTypes.object,
    rules: PropTypes.object,
    register: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
        }),
    ).isRequired,
    onChange: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default hot(ProfileSelect);

const FullWidthFormControl = styled(FormControl)`
    width: 100%;
`;
