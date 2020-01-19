import React from "react";
import { css } from "@emotion/core";
import { hot } from "react-hot-loader/root";
import { Search as SearchIcon } from "@material-ui/icons";
import { Grid, InputAdornment, TextField } from "@material-ui/core";
import PropTypes from "prop-types";

const styles = {
    icon: css`
        opacity: 0.54;
    `,
};

function Search(props) {
    const { onChange, ...rest } = props;

    return (
        <Grid container {...rest}>
            <Grid item xs={8} />
            <Grid item xs={4}>
                <TextField
                    fullWidth
                    placeholder="Поиск по книгам"
                    onChange={onChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon css={styles.icon} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
        </Grid>
    );
}

Search.propTypes = {
    onChange: PropTypes.func,
};

export default hot(Search);
