/** @jsx jsx */

import React, { useState } from "react";
import { css, jsx } from "@emotion/core";
import Layout from "components/Layout";
import BaseHeader from "components/BaseHeader";
import IconButton from "@material-ui/core/IconButton";
import { ArrowBack, LibraryBooks, Menu } from "@material-ui/icons";
import Drawer from "@material-ui/core/Drawer";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { Link, Router } from "@reach/router";
import BookList from "views/BookList";

export default function Dashboard(props) {
    const { user } = props;

    const [drawerOpen, setDrawerOpen] = useState(false);

    function handleDrawerClose() {
        setDrawerOpen(false);
    }

    function handleDrawerOpen() {
        setDrawerOpen(true);
    }

    return (
        <React.Fragment>
            <BaseHeader>
                <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                    <Menu />
                </IconButton>
                <Grid
                    css={css`
                        flex-grow: 1;
                        justify-content: flex-end;
                    `}
                />
                <Chip
                    css={css`
                        cursor: pointer;
                    `}
                    avatar={<Avatar>{user.login.substring(0, 1).toUpperCase()}</Avatar>}
                    label={user.login}
                />
            </BaseHeader>
            <Layout>
                <Drawer open={drawerOpen} onClose={handleDrawerClose}>
                    <List
                        css={css`
                            width: 250px;
                        `}
                    >
                        <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <ArrowBack />
                            </ListItemIcon>
                            <ListItemText>На главную</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="books" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <LibraryBooks />
                            </ListItemIcon>
                            <ListItemText>Все книги</ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
                <Router>
                    <BookList path="books/*" />
                </Router>
            </Layout>
        </React.Fragment>
    );
}

Dashboard.propTypes = {
    user: PropTypes.shape({
        login: PropTypes.string.isRequired,
    }).isRequired,
};
