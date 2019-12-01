import { doOnLogin } from "./actions";
import { connect } from "react-redux";
import Login from "views/Login";

const mapStateToProps = state => ({
    logged: state.auth.user !== null,
    loading: state.auth.loading,
    error: state.auth.error,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    login: (login, password) => dispatch(doOnLogin(login, password)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
