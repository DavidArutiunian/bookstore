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
        return new Promise(resolve => {
            dispatch(doOnRegisterStart());
            // TODO: create user via API
            setTimeout(resolve, 1000);
        })
            .then(() => dispatch(doOnRegisterSuccess(login)))
            .catch(error => dispatch(doOnRegisterFail(error)));
    };
}

export function doOnRegisterStart() {
    return {
        type: REGISTER,
        loading: true,
    };
}

export function doOnRegisterSuccess(login) {
    return {
        type: REGISTER_SUCCESS,
        loading: false,
        login,
    };
}

export function doOnRegisterFail(error) {
    return {
        type: REGISTER_FAILURE,
        loading: false,
        error,
    };
}

export function doOnLogin(login, _password) {
    return dispatch => {
        return new Promise(resolve => {
            dispatch(doOnLoginStart());
            // TODO: login via API
            setTimeout(resolve, 1000);
        })
            .then(dispatch(doOnLoginSuccess(login)))
            .catch(error => dispatch(doOnLoginFailure(error)));
    };
}

export function doOnLoginStart() {
    return {
        type: LOGIN,
        loading: true,
    };
}

export function doOnLoginSuccess(login) {
    return {
        type: LOGIN_SUCCESS,
        loading: false,
        login,
    };
}

export function doOnLoginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        loading: false,
        error,
    };
}
