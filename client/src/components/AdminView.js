import { hot } from "react-hot-loader/root";
import PropTypes from "prop-types";

function AdminView(props) {
    const { admin, children } = props;

    return admin ? children : null;
}

AdminView.propTypes = {
    admin: PropTypes.bool.isRequired,
};

export default hot(AdminView);
