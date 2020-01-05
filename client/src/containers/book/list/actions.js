import ky from "ky";
import {
    BOOK_LIST_FETCH,
    BOOK_LIST_FETCH_FAIL,
    BOOK_LIST_FETCH_SUCCESS,
    BOOK_PROFILE_DELETE_SUCCESS,
    BOOK_PROFILE_DELETE_FAIL,
    BOOK_PROFILE_DELETE,
} from "containers/book/list/constants";

export const fetchBooks = () => async (dispatch, getState) => {
    try {
        dispatch(doOnBooksFetchStart());
        const headers = { authorization: getState().auth.token };
        const books = await ky.get(`${process.env.REACT_APP_API}/book`, { headers }).json();
        dispatch(doOnBooksFetchSuccess(books));
    } catch (error) {
        console.error(error);
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

export const deleteBook = id => async (dispatch, getState) => {
    try {
        dispatch(doOnBookProfileDeleteStart());
        const headers = { authorization: getState().auth.token };
        await ky.delete(`${process.env.REACT_APP_API}/book/${id}`, { headers });
        dispatch(doOnBookProfileDeleteSuccess());
        dispatch(fetchBooks());
    } catch (error) {
        console.error(error);
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
