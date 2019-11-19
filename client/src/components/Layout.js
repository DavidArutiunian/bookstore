/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import Grid from "@material-ui/core/Grid";

export default function Layout(props) {
    const { children, ...rest } = props;

    return (
        <Grid
            container
            {...rest}
            css={css`
                width: 100%;
                height: 100%;
            `}
        >
            {children}
        </Grid>
    );
}
