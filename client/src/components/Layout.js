import Grid from "@material-ui/core/Grid";
import { hot } from "react-hot-loader/root";
import styled from "@emotion/styled";
import React from "react";

function Layout(props) {
    const { children, ...rest } = props;

    return (
        <FullWidthContainer container {...rest}>
            {children}
        </FullWidthContainer>
    );
}

export default hot(Layout);

const FullWidthContainer = styled(Grid)`
    width: 100%;
    height: 100%;
`;
