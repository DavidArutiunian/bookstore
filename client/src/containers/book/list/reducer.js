import {
    BOOK_LIST_FETCH_SUCCESS,
    BOOK_LIST_FETCH,
    BOOK_LIST_FETCH_FAIL,
    BOOK_PROFILE_DELETE_FAIL,
    BOOK_PROFILE_DELETE_SUCCESS,
    BOOK_PROFILE_DELETE,
} from "containers/book/list/constants";

const initialState = {
    loading: false,
    error: false,
    books: [],
};

export default (state = initialState, { payload, type }) => {
    switch (type) {
        case BOOK_PROFILE_DELETE:
        case BOOK_PROFILE_DELETE_SUCCESS:
        case BOOK_LIST_FETCH:
            return {
                ...state,
                loading: payload.loading,
            };
        case BOOK_LIST_FETCH_SUCCESS:
            return {
                ...state,
                loading: payload.loading,
                books: payload.books,
            };
        case BOOK_PROFILE_DELETE_FAIL:
        case BOOK_LIST_FETCH_FAIL:
            return {
                ...state,
                loading: payload.loading,
                error: payload.error,
            };
        default:
            return state;
    }
};
