import Dashboard from "views/Dashboard";
import { connect } from "react-redux";
import { hot } from "react-hot-loader/root";
import auth from "containers/auth/slice";

const { logoutUser } = auth.actions;

const mapStateToProps = ({ auth }) => ({
    logged: auth.user !== null,
    user: auth.user,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser()),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Dashboard),
);
