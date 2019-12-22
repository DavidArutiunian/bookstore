import {
    REGISTER,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    LOGIN,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
} from "./constants";

const initialState = {
    loading: false,
    error: false,
    user: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                loading: payload.loading,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: payload.loading,
                user: {
                    login: payload.login,
                },
            };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {
                ...state,
                error: payload.error,
                loading: payload.loading,
            };
        default:
            return state;
    }
};
