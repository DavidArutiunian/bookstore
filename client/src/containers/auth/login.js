import { doOnLogin } from "./actions";
import { connect } from "react-redux";
import Login from "views/Login";
import { hot } from "react-hot-loader/root";

const mapStateToProps = state => ({
    logged: state.auth.user !== null,
    loading: state.auth.loading,
    error: state.auth.error,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    login: (login, password) => dispatch(doOnLogin(login, password)),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Login),
);
