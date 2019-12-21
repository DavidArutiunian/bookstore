import { css } from "@emotion/core";
import { Input as MaterialInput } from "@material-ui/core";
import React from "react";

const styles = {
    input: css`
        :after {
            border-bottom: 2px solid #3ba5d1;
        }
    `,
};

function Input(props, ref) {
    return <MaterialInput css={styles.input} fullWidth inputRef={ref} {...props} />;
}

export default React.forwardRef(Input);
