import Layout from "./Layout";
import React from "react";
import { hot } from "react-hot-loader/root";

function CenteredLayout(props) {
    const { children } = props;

    return (
        <Layout direction="column" alignItems="center" justify="center">
            {children}
        </Layout>
    );
}

export default hot(CenteredLayout);
