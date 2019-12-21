import Dashboard from "views/Dashboard";
import { connect } from "react-redux";
import { hot } from "react-hot-loader/root";

const mapStateToProps = state => ({
    logged: state.auth.user !== null,
    user: state.auth.user,
});

export default hot(connect(mapStateToProps)(Dashboard));
