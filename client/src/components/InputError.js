import Typography from "@material-ui/core/Typography";
import React from "react";
import { hot } from "react-hot-loader/root";
import styled from "@emotion/styled";

function InputError(props) {
    return <Message variant="caption">{props.message}</Message>;
}

export default hot(InputError);

const Message = styled(Typography)`
    color: red;
`;
