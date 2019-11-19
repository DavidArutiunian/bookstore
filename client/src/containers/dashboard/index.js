import Dashboard from "views/Dashboard";
import { connect } from "react-redux";

const mapStateToProps = state => ({
    logged: state.auth.user !== null,
    user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
