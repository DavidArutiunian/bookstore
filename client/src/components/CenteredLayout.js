/** @jsx jsx */

import { jsx } from "@emotion/core";
import Layout from "./Layout";

export default function CenteredLayout(props) {
    const { children } = props;

    return (
        <Layout direction="column" alignItems="center" justify="center">
            {children}
        </Layout>
    );
}
