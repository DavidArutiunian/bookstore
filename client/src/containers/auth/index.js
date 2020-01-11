import { loginUser } from "./actions";
import { connect } from "react-redux";
import Login from "views/Login";
import { hot } from "react-hot-loader/root";
import AdminView from "components/AdminView";

const mapStateToProps = ({ auth }) => ({
    logged: auth.user !== null && auth.token !== null,
    loading: auth.loading,
    error: auth.error,
    admin: auth.user?.is_admin === 1,
});

const mapDispatchToProps = dispatch => ({
    login: (login, password) => dispatch(loginUser(login, password)),
});

export default {
    Login: hot(
        connect(
            mapStateToProps,
            mapDispatchToProps,
        )(Login),
    ),
    AdminView: hot(connect(mapStateToProps)(AdminView)),
};
