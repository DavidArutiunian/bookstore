import ky from "ky";
import {
    BOOK_LIST_FETCH,
    BOOK_LIST_FETCH_FAIL,
    BOOK_LIST_FETCH_SUCCESS,
    BOOK_PROFILE_DELETE_SUCCESS,
    BOOK_PROFILE_DELETE_FAIL,
    BOOK_PROFILE_DELETE,
} from "./constants";

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
        payload: {
            books,
            loading: false,
        },
    };
}

function donOnBooksFetchFail(error) {
    return {
        type: BOOK_LIST_FETCH_FAIL,
        payload: {
            loading: false,
            error,
        },
    };
}

export function doOnBookProfileDelete(id) {
    return async dispatch => {
        try {
            dispatch(doOnBookProfileDeleteStart());
            await ky.delete(`${process.env.REACT_APP_API}/books/${id}`);
            dispatch(doOnBookProfileDeleteSuccess());
            dispatch(doOnBooksFetch());
        } catch (error) {
            doOnProfileDeleteFail(error);
        }
    };
}

function doOnBookProfileDeleteStart() {
    return {
        type: BOOK_PROFILE_DELETE,
        payload: {
            loading: true,
        },
    };
}

function doOnBookProfileDeleteSuccess() {
    return {
        type: BOOK_PROFILE_DELETE_SUCCESS,
        payload: {
            loading: false,
        },
    };
}

export function doOnProfileDeleteFail(error) {
    return {
        type: BOOK_PROFILE_DELETE_FAIL,
        payload: {
            loading: false,
            error,
        },
    };
}
