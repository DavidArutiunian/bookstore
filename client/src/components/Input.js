/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { Input as MaterialInput } from "@material-ui/core";
import * as React from "react";

function Input(props, ref) {
    return (
        <MaterialInput
            fullWidth
            inputRef={ref}
            css={css`
                :after {
                    border-bottom: 2px solid #3ba5d1;
                }
            `}
            {...props}
        />
    );
}

export default React.forwardRef(Input);
