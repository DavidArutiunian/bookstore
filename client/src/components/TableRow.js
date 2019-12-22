import TableRow from "@material-ui/core/TableRow";
import styled from "@emotion/styled";
import { hot } from "react-hot-loader/root";

export default hot(styled(TableRow)`
    cursor: pointer;
    text-decoration: none;

    :hover {
        background: #eeeeee;
    }
`);
