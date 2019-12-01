/** @jsx jsx */

import React, { useEffect } from "react";
import AuthBase from "components/AuthBase";
import { jsx } from "@emotion/core";
import { Link, navigate } from "@reach/router";
import CenteredLayout from "components/CenteredLayout";
import BaseHeader from "components/BaseHeader";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

export default function Register(props) {
    const { logged, register } = props;

    useEffect(() => {
        if (logged) {
            navigate("login");
        }
    }, [logged]);

    return (
        <React.Fragment>
            <BaseHeader>
                <Button color="inherit" component={Link} to="/login">
                    На вход
                </Button>
            </BaseHeader>
            <CenteredLayout>
                <AuthBase onSubmit={register}>Регистрация</AuthBase>
            </CenteredLayout>
        </React.Fragment>
    );
}

Register.propTypes = {
    logged: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    register: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
};
