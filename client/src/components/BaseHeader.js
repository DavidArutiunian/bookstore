/** @jsx jsx */

import { jsx } from "@emotion/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

export default function BaseHeader(props) {
    const { children } = props;

    return (
        <AppBar position="static">
            <Toolbar>
                {children}
            </Toolbar>
        </AppBar>
    );
}
