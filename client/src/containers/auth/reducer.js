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

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
        case REGISTER:
            return {
                ...state,
                loading: action.payload.loading,
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: action.payload.loading,
                user: {
                    login: action.payload.login,
                },
            };
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
            return {
                ...state,
                error: action.payload.error,
                loading: action.payload.loading,
            };
        default:
            return state;
    }
}
