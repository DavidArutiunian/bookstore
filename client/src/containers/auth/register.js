import { doOnRegister } from "./actions";
import { connect } from "react-redux";
import Register from "views/Register";
import { hot } from "react-hot-loader/root";

const mapStateToProps = state => ({
    logged: state.auth.user !== null,
    loading: state.auth.loading,
    error: state.auth.error,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    register: (login, password) => dispatch(doOnRegister(login, password)),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Register),
);
