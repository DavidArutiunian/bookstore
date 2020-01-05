import { loginUser } from "./actions";
import { connect } from "react-redux";
import Login from "views/Login";
import { hot } from "react-hot-loader/root";

const mapStateToProps = ({ auth }) => ({
    logged: auth.user !== null,
    loading: auth.loading,
    error: auth.error,
    user: auth.user,
});

const mapDispatchToProps = dispatch => ({
    login: (login, password) => dispatch(loginUser(login, password)),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Login),
);
