import {
    PUBLISHING_OFFICE_LIST_FETCH_FAIL,
    PUBLISHING_OFFICE_LIST_FETCH,
    PUBLISHING_OFFICE_LIST_FETCH_SUCCESS,
    PUBLISHING_OFFICE_LIST_DELETE_FAIL,
    PUBLISHING_OFFICE_LIST_DELETE,
    PUBLISHING_OFFICE_LIST_DELETE_SUCCESS,
} from "./constants";

const initialState = {
    loading: false,
    error: false,
    offices: [],
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case PUBLISHING_OFFICE_LIST_DELETE:
        case PUBLISHING_OFFICE_LIST_DELETE_SUCCESS:
        case PUBLISHING_OFFICE_LIST_FETCH:
            return {
                ...state,
                loading: payload.loading,
            };
        case PUBLISHING_OFFICE_LIST_FETCH_SUCCESS:
            return {
                ...state,
                loading: payload.loading,
                offices: payload.offices,
            };
        case PUBLISHING_OFFICE_LIST_DELETE_FAIL:
        case PUBLISHING_OFFICE_LIST_FETCH_FAIL:
            return {
                ...state,
                loading: payload.loading,
                error: payload.error,
            };
        default:
            return state;
    }
};
