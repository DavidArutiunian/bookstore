import {
    PUBLISHING_OFFICE_PROFILE_FETCH_SUCCESS,
    PUBLISHING_OFFICE_PROFILE_FETCH_FAIL,
    PUBLISHING_OFFICE_PROFILE_FETCH,
    PUBLISHING_OFFICE_PROFILE_CHANGE,
    PUBLISHING_OFFICE_PROFILE_EDIT,
    PUBLISHING_OFFICE_SAVE_FAIL,
    PUBLISHING_OFFICE_SAVE_SUCCESS,
    PUBLISHING_OFFICE_SAVE,
} from "./constants";

const initialState = {
    loading: false,
    error: false,
    editing: false,
    office: null,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case PUBLISHING_OFFICE_PROFILE_FETCH:
            return {
                ...state,
                loading: payload.loading,
            };
        case PUBLISHING_OFFICE_PROFILE_FETCH_SUCCESS:
            return {
                ...state,
                loading: payload.loading,
                office: payload.office,
            };
        case PUBLISHING_OFFICE_PROFILE_FETCH_FAIL:
            return {
                ...state,
                loading: payload.loading,
                error: payload.error,
            };
        case PUBLISHING_OFFICE_PROFILE_CHANGE:
            return {
                ...state,
                office: {
                    ...state.office,
                    ...payload.change,
                },
            };
        case PUBLISHING_OFFICE_PROFILE_EDIT:
            return {
                ...state,
                editing: payload.editing,
            };
        case PUBLISHING_OFFICE_SAVE:
            return {
                ...state,
                editing: payload.editing,
                loading: payload.loading,
            };
        case PUBLISHING_OFFICE_SAVE_SUCCESS:
            return {
                ...state,
                editing: payload.editing,
                loading: payload.loading,
                office: payload.office,
            };
        case PUBLISHING_OFFICE_SAVE_FAIL:
            return {
                ...state,
                editing: payload.editing,
                loading: payload.loading,
                error: payload.error,
            };
        default:
            return state;
    }
};
