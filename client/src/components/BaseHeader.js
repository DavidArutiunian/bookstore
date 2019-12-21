import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { hot } from "react-hot-loader/root";

function BaseHeader(props) {
    const { children } = props;

    return (
        <AppBar position="static">
            <Toolbar>{children}</Toolbar>
        </AppBar>
    );
}

export default hot(BaseHeader);
