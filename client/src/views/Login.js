/** @jsx jsx */

import { jsx } from "@emotion/core";
import AuthBase from "components/AuthBase";
import React, { useEffect } from "react";
import { Link, navigate } from "@reach/router";
import Button from "@material-ui/core/Button";
import CenteredLayout from "components/CenteredLayout";
import BaseHeader from "components/BaseHeader";
import PropTypes from "prop-types";

export default function Login(props) {
    const { onLogin, logged } = props;

    useEffect(() => {
        if (logged) {
            navigate("/");
        }
    }, [logged]);

    return (
        <React.Fragment>
            <BaseHeader>
                <Button color="inherit" component={Link} to="/register">
                    На регистрацию
                </Button>
            </BaseHeader>
            <CenteredLayout>
                <AuthBase onSubmit={onLogin}>Вход</AuthBase>
            </CenteredLayout>
        </React.Fragment>
    );
}

Login.propTypes = {
    onLogin: PropTypes.func,
    logged: PropTypes.bool,
};
