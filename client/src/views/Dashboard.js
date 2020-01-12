import React, { useState } from "react";
import { css } from "@emotion/core";
import Layout from "components/Layout";
import BaseHeader from "components/BaseHeader";
import IconButton from "@material-ui/core/IconButton";
import {
    ArrowBack,
    Business,
    ExitToApp,
    Group,
    LibraryBooks,
    LocalLibrary,
    Menu as MenuIcon,
    Shop,
    ShoppingCart,
} from "@material-ui/icons";
import Drawer from "@material-ui/core/Drawer";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { Link, navigate, Router } from "@reach/router";
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
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Typography from "@material-ui/core/Typography";

const styles = {
    chip: css`
        cursor: pointer;
    `,
    drawer: css`
        width: 250px;
    `,
};

function Dashboard(props) {
    const { user, logout } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutClick = () => {
        handleClose();
        logout();
        navigate("/login");
    };

    return (
        <>
            <BaseHeader>
                <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
                    <MenuIcon />
                </IconButton>
                <HeaderWhitespace />
                <Chip
                    css={styles.chip}
                    avatar={<Avatar>{user.login.substring(0, 1).toUpperCase()}</Avatar>}
                    label={user.login}
                    onClick={handleClick}
                />
                <Menu
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleLogoutClick}>
                        <ListItemIcon>
                            <ExitToApp />
                        </ListItemIcon>
                        <Typography variant="inherit" noWrap>
                            Выход
                        </Typography>
                    </MenuItem>
                </Menu>
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
                        <ListItem button component={Link} to="author" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <LocalLibrary />
                            </ListItemIcon>
                            <ListItemText>Авторы</ListItemText>
                        </ListItem>
                        <Divider />
                        <Auth.AdminView>
                            <ListItem
                                button
                                component={Link}
                                to="employee"
                                onClick={handleDrawerClose}
                            >
                                <ListItemIcon>
                                    <Shop />
                                </ListItemIcon>
                                <ListItemText>Продавцы</ListItemText>
                            </ListItem>
                        </Auth.AdminView>
                        <ListItem button component={Link} to="customer" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <Group />
                            </ListItemIcon>
                            <ListItemText>Покупатели</ListItemText>
                        </ListItem>
                        <ListItem button component={Link} to="order" onClick={handleDrawerClose}>
                            <ListItemIcon>
                                <ShoppingCart />
                            </ListItemIcon>
                            <ListItemText>Заказы</ListItemText>
                        </ListItem>
                    </List>
                </Drawer>
                <Router>
                    <BookList path="book/*" />
                    <PublishingOfficeList path="publishing_office/*" />
                    <AuthorList path="author/*" />
                    <Auth.AdminView path="employee">
                        <EmployeeList path="/*" />
                    </Auth.AdminView>
                    <CustomerList path="customer/*" />
                    <OrderList path="order/*" />
                </Router>
            </Layout>
        </>
    );
}

Dashboard.propTypes = {
    user: PropTypes.shape({
        login: PropTypes.string.isRequired,
    }).isRequired,
    logout: PropTypes.func.isRequired,
};

const HeaderWhitespace = styled(Grid)`
    flex-grow: 1;
    justify-content: flex-end;
`;

export default hot(Dashboard);
