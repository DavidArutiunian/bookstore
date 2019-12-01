import ky from "ky";
import { BOOK_LIST_FETCH, BOOK_LIST_FETCH_FAIL, BOOK_LIST_FETCH_SUCCESS } from "./constants";

export function doOnBooksFetch() {
    return async dispatch => {
        try {
            dispatch(doOnBooksFetchStart());
            const books = await ky.get(`${process.env.REACT_APP_API}/books`).json();
            dispatch(doOnBooksFetchSuccess(books));
        } catch (error) {
            donOnBooksFetchFail(error);
        }
    };
}

function doOnBooksFetchStart() {
    return {
        type: BOOK_LIST_FETCH,
        payload: {
            loading: true,
        },
    };
}

function doOnBooksFetchSuccess(books) {
    return {
        type: BOOK_LIST_FETCH_SUCCESS,
        payload: { books, loading: false },
    };
}

function donOnBooksFetchFail(error) {
    return {
        type: BOOK_LIST_FETCH_FAIL,
        payload: { loading: false, error },
    };
}
