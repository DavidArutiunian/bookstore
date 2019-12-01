import { doOnRegister } from "./actions";
import { connect } from "react-redux";
import Register from "views/Register";

const mapStateToProps = state => ({
    logged: state.auth.user !== null,
    loading: state.auth.loading,
    error: state.auth.error,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    register: (login, password) => dispatch(doOnRegister(login, password)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Register);
