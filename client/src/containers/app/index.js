import { connect } from "react-redux";
import App from "views/App";

const mapStateToProps = ({ auth }) => ({
    logged: auth.user !== null,
    user: auth.user,
});

export default connect(mapStateToProps)(App);
