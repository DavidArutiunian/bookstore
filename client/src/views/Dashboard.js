import React, { useState } from "react";
import { css } from "@emotion/core";
import Layout from "components/Layout";
import BaseHeader from "components/BaseHeader";
import IconButton from "@material-ui/core/IconButton";
import { ArrowBack, Business, LibraryBooks, Menu } from "@material-ui/icons";
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
import BookList from "containers/book/list";
import PublishingOfficeList from "containers/publishing_office/list";
import Divider from "@material-ui/core/Divider";
import { hot } from "react-hot-loader/root";
import styled from "@emotion/styled";

const styles = {
    chip: css`
        cursor: pointer;
    `,
    drawer: css`
        width: 250px;
    `,
};

function Dashboard(props) {
    const { user } = props;

    const [drawerOpen, setDrawerOpen] = useState(false);

    function handleDrawerClose() {
        setDrawerOpen(false);
    }

    function handleDrawerOpen() {
        setDrawerOpen(true);
    }

    return (
        <>
            <BaseHeader>
                <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                    <Menu />
                </IconButton>
                <HeaderWhitespace />
                <Chip
                    css={styles.chip}
                    avatar={<Avatar>{user.login.substring(0, 1).toUpperCase()}</Avatar>}
                    label={user.login}
                />
            </BaseHeader>
            <Layout>
                <Drawer open={drawerOpen} onClose={handleDrawerClose}>
                    <List css={styles.drawer}>
                        <ListItem button component={Link} to="/" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <ArrowBack />
                            </ListItemIcon>
                            <ListItemText>На главную</ListItemText>
                        </ListItem>
                        <Divider />
                        <ListItem button component={Link} to="book" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <LibraryBooks />
                            </ListItemIcon>
                            <ListItemText>Все книги</ListItemText>
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="publishing_office"
                            onClick={handleDrawerClose}
                        >
                            <ListItemIcon>
                                <Business />
                            </ListItemIcon>
                            <ListItemText>Издательские дома</ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
                <Router>
                    <BookList path="book/*" />
                    <PublishingOfficeList path="publishing_office/*" />
                </Router>
            </Layout>
        </>
    );
}

Dashboard.propTypes = {
    user: PropTypes.shape({
        login: PropTypes.string.isRequired,
    }).isRequired,
};

const HeaderWhitespace = styled(Grid)`
    flex-grow: 1;
    justify-content: flex-end;
`;

export default hot(Dashboard);
