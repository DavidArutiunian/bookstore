import { CssBaseline } from "@material-ui/core";
import { css, Global } from "@emotion/core";
import { Router } from "@reach/router";
import Login from "containers/auth";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Dashboard from "containers/dashboard";
import PrivateRoute from "components/PrivateRoute";
import { hot } from "react-hot-loader/root";
import React from "react";
import styled from "@emotion/styled";

const styles = {
    global: css`
        html,
        body,
        #root,
        div[role="group"] {
            width: 100%;
            height: 100%;
        }
    `,
};

function App(props) {
    const { logged } = props;

    return (
        <CssBaseline>
            <Global styles={styles.global} />
            <AppContainer>
                <Router>
                    <Login path="login" />
                    <PrivateRoute
                        authorized={logged}
                        path="*"
                        render={props => <Dashboard {...props} />}
                    />
                </Router>
            </AppContainer>
        </CssBaseline>
    );
}

App.propTypes = {
    logged: PropTypes.bool,
};

export default hot(App);

const AppContainer = styled(Container)`
    height: calc(100% - 64px);
    max-width: 100%;
    padding: 0;
`;
