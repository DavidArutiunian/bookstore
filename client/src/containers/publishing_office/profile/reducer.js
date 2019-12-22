import {
    BOOK_PROFILE_FETCH_FAIL,
    BOOK_PROFILE_FETCH,
    BOOK_PROFILE_FETCH_SUCCESS,
} from "./constants";

const initialState = {
    loading: false,
    error: false,
    editing: false,
    office: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case BOOK_PROFILE_FETCH:
            return {
                ...state,
                loading: payload.loading,
            };
        case BOOK_PROFILE_FETCH_SUCCESS:
            return {
                ...state,
                loading: payload.loading,
                office: payload.office,
            };
        case BOOK_PROFILE_FETCH_FAIL:
            return {
                ...state,
                loading: payload.loading,
                error: payload.error,
            };
        default:
            return state;
    }
};
