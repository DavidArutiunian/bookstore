import {
    REGISTER,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    LOGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
} from "./constants";

export function doOnRegister(login, _password) {
    return dispatch => {
        try {
            dispatch(doOnRegisterStart());
            dispatch(doOnRegisterSuccess(login));
        } catch (error) {
            dispatch(doOnRegisterFail(error));
        }
    };
}

function doOnRegisterStart() {
    return {
        type: REGISTER,
        payload: {
            loading: true,
        },
    };
}

function doOnRegisterSuccess(login) {
    return {
        type: REGISTER_SUCCESS,
        payload: {
            loading: false,
            login,
        },
    };
}

function doOnRegisterFail(error) {
    return {
        type: REGISTER_FAILURE,
        payload: {
            loading: false,
            error,
        },
    };
}

export function doOnLogin(login, _password) {
    return dispatch => {
        try {
            dispatch(doOnLoginStart());
            dispatch(doOnLoginSuccess(login));
        } catch (error) {
            dispatch(doOnLoginFailure(error));
        }
    };
}

function doOnLoginStart() {
    return {
        type: LOGIN,
        payload: {
            loading: true,
        },
    };
}

function doOnLoginSuccess(login) {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            loading: false,
            login,
        },
    };
}

function doOnLoginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        payload: {
            loading: false,
            error,
        },
    };
}
