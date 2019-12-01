import {
    BOOK_PROFILE_FETCH_FAIL,
    BOOK_PROFILE_FETCH,
    BOOK_PROFILE_FETCH_SUCCESS,
    BOOK_PROFILE_EDITING,
    BOOK_PROFILE_EDITING_DONE,
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
        case BOOK_PROFILE_EDITING_DONE:
        case BOOK_PROFILE_EDITING:
            return {
                ...state,
                editing: action.payload.editing,
            };
        default:
            return state;
    }
}
