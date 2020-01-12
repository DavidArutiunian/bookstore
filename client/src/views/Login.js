import AuthBase from "components/AuthBase";
import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import CenteredLayout from "components/CenteredLayout";
import BaseHeader from "components/BaseHeader";
import PropTypes from "prop-types";
import { hot } from "react-hot-loader/root";

function Login(props) {
    const { logged, login } = props;

    useEffect(() => {
        if (logged) {
            navigate("/");
        }
    }, [logged]);

    return (
        <>
            <BaseHeader />
            <CenteredLayout>
                <AuthBase onSubmit={login}>Вход</AuthBase>
            </CenteredLayout>
        </>
    );
}

Login.propTypes = {
    logged: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    user: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    login: PropTypes.func,
};

export default hot(Login);
