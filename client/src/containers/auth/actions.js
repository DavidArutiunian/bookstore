import {
    REGISTER,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    LOGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
} from "./constants";

export const register = (login, password) => async dispatch => {
    void password;
    try {
        dispatch(registerStart());
        dispatch(registerSuccess(login));
    } catch (error) {
        dispatch(registerFail(error));
    }
};

const registerStart = () => ({
    type: REGISTER,
    payload: {
        loading: true,
    },
});

const registerSuccess = login => ({
    type: REGISTER_SUCCESS,
    payload: {
        loading: false,
        login,
    },
});

const registerFail = error => ({
    type: REGISTER_FAILURE,
    payload: {
        loading: false,
        error,
    },
});

export const login = (login, password) => async dispatch => {
    void password;
    try {
        dispatch(loginStart());
        dispatch(loginSuccess(login));
    } catch (error) {
        dispatch(loginFail(error));
    }
};

const loginStart = () => ({
    type: LOGIN,
    payload: {
        loading: true,
    },
});

const loginSuccess = login => ({
    type: LOGIN_SUCCESS,
    payload: {
        loading: false,
        login,
    },
});

const loginFail = error => ({
    type: LOGIN_FAILURE,
    payload: {
        loading: false,
        error,
    },
});
