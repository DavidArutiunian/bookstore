import { Redirect } from "@reach/router";
import React from "react";
import PropTypes from "prop-types";

export default function PrivateRoute(props) {
    const { authorized = false, noRedirect = false, to = "/login", render, ...rest } = props;

    if (!authorized) {
        if (noRedirect) {
            return null;
        } else {
            return <Redirect to={to} noThrow />;
        }
    } else {
        return <>{render(rest)}</>;
    }
}

PrivateRoute.propTypes = {
    authorized: PropTypes.bool,
    noRedirect: PropTypes.bool,
    to: PropTypes.string,
    render: PropTypes.func.isRequired,
};
