/** @jsx jsx */

import Typography from "@material-ui/core/Typography";
import { css, jsx } from "@emotion/core";

function InputError(props) {
    return (
        <Typography
            variant="caption"
            css={css`
                color: red;
            `}
        >
            {props.message}
        </Typography>
    );
}

export default InputError;
