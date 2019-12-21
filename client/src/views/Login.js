import AuthBase from "components/AuthBase";
import React, { useEffect } from "react";
import { Link, navigate } from "@reach/router";
import Button from "@material-ui/core/Button";
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
        <React.Fragment>
            <BaseHeader>
                <Button color="inherit" component={Link} to="/register">
                    На регистрацию
                </Button>
            </BaseHeader>
            <CenteredLayout>
                <AuthBase onSubmit={login}>Вход</AuthBase>
            </CenteredLayout>
        </React.Fragment>
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
