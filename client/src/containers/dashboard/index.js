import Dashboard from "views/Dashboard";
import { connect } from "react-redux";
import { hot } from "react-hot-loader/root";
import auth from "containers/auth/slice";
import { fetchTopMostActiveUsers, fetchTopMostPopularBooks } from "./actions";

const { logoutUser } = auth.actions;

const mapStateToProps = ({ auth, dashboard }) => ({
    logged: auth.user !== null,
    user: auth.user,
    loading: dashboard.loading,
    error: dashboard.error,
    topMostActiveUsers: dashboard.topMostActiveUsers,
    topMostPopularBooks: dashboard.topMostPopularBooks,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutUser()),
    fetchTopMostActiveUsers: limit => dispatch(fetchTopMostActiveUsers(limit)),
    fetchTopMostPopularBooks: limit => dispatch(fetchTopMostPopularBooks(limit)),
});

export default hot(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )(Dashboard),
);
