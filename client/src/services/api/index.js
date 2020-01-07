import ky from "ky";
import auth from "../../containers/auth/slice";
import store from "../../store";
import { navigate } from "@reach/router";

export default ky.create({
    prefixUrl: process.env.REACT_APP_API,
    hooks: {
        afterResponse: [
            async (_req, _opts, res) => {
                // clear local storage & reload page
                // if unauthorized error
                if (res.status === 403) {
                    store.dispatch(auth.actions.logoutUser());
                    await navigate("/");
                }
            },
        ],
    },
});
