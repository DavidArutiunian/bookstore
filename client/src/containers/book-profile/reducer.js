import {
    BOOK_PROFILE_EDIT,
    BOOK_PROFILE_EDITING,
    BOOK_PROFILE_FETCH,
    BOOK_PROFILE_FETCH_FAIL,
    BOOK_PROFILE_FETCH_SUCCESS,
    BOOK_PROFILE_SAVE,
    BOOK_PROFILE_SAVE_FAIL,
    BOOK_PROFILE_SAVE_SUCCESS,
    BOOK_PROFILE_CREATE_FAIL,
    BOOK_PROFILE_CREATE,
    BOOK_PROFILE_CREATE_SUCCESS,
} from "./constants";

const initialState = {
    loading: false,
    error: false,
    editing: false,
    book: null,
};

export default function bookProfileReducer(state = initialState, action) {
    switch (action.type) {
        case BOOK_PROFILE_FETCH:
            return {
                ...state,
                loading: action.payload.loading,
            };
        case BOOK_PROFILE_FETCH_SUCCESS:
            return {
                ...state,
                loading: action.payload.loading,
                book: action.payload.book,
            };
        case BOOK_PROFILE_FETCH_FAIL:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
            };
        case BOOK_PROFILE_EDITING:
            return {
                ...state,
                editing: action.payload.editing,
            };
        case BOOK_PROFILE_EDIT:
            return {
                ...state,
                book: {
                    ...state.book,
                    ...action.payload.change,
                },
            };
        case BOOK_PROFILE_SAVE:
        case BOOK_PROFILE_CREATE:
            return {
                ...state,
                editing: action.payload.editing,
                loading: action.payload.loading,
            };
        case BOOK_PROFILE_SAVE_SUCCESS:
        case BOOK_PROFILE_CREATE_SUCCESS:
            return {
                ...state,
                editing: action.payload.editing,
                loading: action.payload.loading,
                book: action.payload.book,
            };
        case BOOK_PROFILE_SAVE_FAIL:
        case BOOK_PROFILE_CREATE_FAIL:
            return {
                ...state,
                editing: action.payload.editing,
                loading: action.payload.loading,
                error: action.payload.error,
            };
        default:
            return state;
    }
}
