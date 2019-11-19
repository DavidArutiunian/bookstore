import { doOnRegister } from "./actions";
import { connect } from "react-redux";
import Register from "views/Register";

const mapStateToProps = state => ({
    logged: state.auth.user !== null,
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    onRegister: (login, password) => dispatch(doOnRegister(login, password)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Register);
