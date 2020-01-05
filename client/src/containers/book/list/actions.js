import ky from "ky";
import {
    BOOK_LIST_FETCH,
    BOOK_LIST_FETCH_FAIL,
    BOOK_LIST_FETCH_SUCCESS,
    BOOK_PROFILE_DELETE_SUCCESS,
    BOOK_PROFILE_DELETE_FAIL,
    BOOK_PROFILE_DELETE,
} from "containers/book/list/constants";

export const fetchBooks = () => async dispatch => {
    try {
        dispatch(doOnBooksFetchStart());
        const books = await ky.get(`${process.env.REACT_APP_API}/book`).json();
        dispatch(doOnBooksFetchSuccess(books));
    } catch (error) {
        dispatch(donOnBooksFetchFail(error));
    }
};

const doOnBooksFetchStart = () => ({
    type: BOOK_LIST_FETCH,
    payload: {
        loading: true,
    },
});

const doOnBooksFetchSuccess = books => ({
    type: BOOK_LIST_FETCH_SUCCESS,
    payload: {
        books,
        loading: false,
    },
});

const donOnBooksFetchFail = error => ({
    type: BOOK_LIST_FETCH_FAIL,
    payload: {
        loading: false,
        error,
    },
});

export const deleteBook = id => async dispatch => {
    try {
        dispatch(doOnBookProfileDeleteStart());
        await ky.delete(`${process.env.REACT_APP_API}/book/${id}`);
        dispatch(doOnBookProfileDeleteSuccess());
        dispatch(fetchBooks());
    } catch (error) {
        dispatch(doOnProfileDeleteFail(error));
    }
};

const doOnBookProfileDeleteStart = () => ({
    type: BOOK_PROFILE_DELETE,
    payload: {
        loading: true,
    },
});

const doOnBookProfileDeleteSuccess = () => ({
    type: BOOK_PROFILE_DELETE_SUCCESS,
    payload: {
        loading: false,
    },
});

const doOnProfileDeleteFail = error => ({
    type: BOOK_PROFILE_DELETE_FAIL,
    payload: {
        loading: false,
        error,
    },
});
