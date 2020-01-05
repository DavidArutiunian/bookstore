import slice from "./slice";
import api from "services/api";

const { loadingUserFail, loginUserStart, loginUserSuccess } = slice.actions;

export const loginUser = (login, password) => async dispatch => {
    try {
        dispatch(loginUserStart());
        const credentials = {
            login,
            password,
        };
        const response = await api.post("employee/login", { json: credentials }).json();
        dispatch(
            loginUserSuccess({
                user: credentials,
                token: response.token,
            }),
        );
    } catch (error) {
        console.error(error);
        dispatch(loadingUserFail({ error }));
    }
};
