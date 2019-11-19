import { connect } from "react-redux";
import App from "views/App";

const mapStateToProps = state => ({
    logged: state.auth.user !== null,
    user: state.auth.user,
});

export default connect(mapStateToProps)(App);
