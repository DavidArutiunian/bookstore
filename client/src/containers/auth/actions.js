import slice from "./slice";
import ky from "ky";

const { loadingUserFail, loginUserStart, loginUserSuccess } = slice.actions;

export const loginUser = (login, password) => async dispatch => {
    try {
        dispatch(loginUserStart());
        const credentials = {
            login,
            password,
        };
        const response = await ky
            .post(`${process.env.REACT_APP_API}/employee/login`, { json: credentials })
            .json();
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
