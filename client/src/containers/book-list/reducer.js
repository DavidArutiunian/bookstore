import { BOOK_LIST_FETCH_SUCCESS, BOOK_LIST_FETCH, BOOK_LIST_FETCH_FAIL } from "./constants";

const initialState = {
    loading: false,
    error: false,
    books: [],
};

export default function bookListReducer(state = initialState, action) {
    switch (action.type) {
        case BOOK_LIST_FETCH:
            return {
                ...state,
                loading: action.payload.loading,
            };
        case BOOK_LIST_FETCH_SUCCESS:
            return {
                ...state,
                loading: action.payload.loading,
                books: action.payload.books,
            };
        case BOOK_LIST_FETCH_FAIL:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
            };
        default:
            return state;
    }
}
