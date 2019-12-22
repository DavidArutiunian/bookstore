import Dashboard from "views/Dashboard";
import { connect } from "react-redux";
import { hot } from "react-hot-loader/root";

const mapStateToProps = ({ auth }) => ({
    logged: auth.user !== null,
    user: auth.user,
});

export default hot(connect(mapStateToProps)(Dashboard));
