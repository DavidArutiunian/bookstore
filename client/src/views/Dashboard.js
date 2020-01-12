import React, { useState } from "react";
import { css } from "@emotion/core";
import Layout from "components/Layout";
import BaseHeader from "components/BaseHeader";
import IconButton from "@material-ui/core/IconButton";
import { ArrowBack, Business, Group, LibraryBooks, LocalLibrary, Menu, Shop, ShoppingCart } from "@material-ui/icons";
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
import Divider from "@material-ui/core/Divider";
import styled from "@emotion/styled";
import { hot } from "react-hot-loader/root";
import BookList from "containers/book/list";
import PublishingOfficeList from "containers/publishing_office/list";
import AuthorList from "containers/author/list";
import CustomerList from "containers/customer/list";
import EmployeeList from "containers/employee/list";
import Auth from "containers/auth";
import OrderList from "containers/order/list";

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
                    <Menu/>
                </IconButton>
                <HeaderWhitespace/>
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
                                <ArrowBack/>
                            </ListItemIcon>
                            <ListItemText>На главную</ListItemText>
                        </ListItem>
                        <Divider/>
                        <ListItem button component={Link} to="book" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <LibraryBooks/>
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
                                <Business/>
                            </ListItemIcon>
                            <ListItemText>Издательские дома</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="author" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <LocalLibrary/>
                            </ListItemIcon>
                            <ListItemText>Авторы</ListItemText>
                        </ListItem>
                        <Divider/>
                        <Auth.AdminView>
                            <ListItem
                                button
                                component={Link}
                                to="employee"
                                onClick={handleDrawerClose}
                            >
                                <ListItemIcon>
                                    <Shop/>
                                </ListItemIcon>
                                <ListItemText>Продавцы</ListItemText>
                            </ListItem>
                        </Auth.AdminView>
                        <ListItem button component={Link} to="customer" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <Group/>
                            </ListItemIcon>
                            <ListItemText>Покупатели</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="order" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <ShoppingCart/>
                            </ListItemIcon>
                            <ListItemText>Заказы</ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
                <Router>
                    <BookList path="book/*"/>
                    <PublishingOfficeList path="publishing_office/*"/>
                    <AuthorList path="author/*"/>
                    <Auth.AdminView path="employee">
                        <EmployeeList path="/*"/>
                    </Auth.AdminView>
                    <CustomerList path="customer/*"/>
                    <OrderList path="order/*"/>
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
