import { doOnLogin } from "./actions";
import { connect } from "react-redux";
import Login from "views/Login";

const mapStateToProps = state => ({
    logged: state.auth.user !== null,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    onLogin: (login, password) => dispatch(doOnLogin(login, password)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
