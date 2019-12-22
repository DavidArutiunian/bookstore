import ky from "ky";
import {
    BOOK_PROFILE_CHANGE,
    BOOK_PROFILE_EDIT,
    BOOK_PROFILE_FETCH,
    BOOK_PROFILE_FETCH_FAIL,
    BOOK_PROFILE_FETCH_SUCCESS,
    BOOK_PROFILE_SAVE,
    BOOK_PROFILE_SAVE_FAIL,
    BOOK_PROFILE_SAVE_SUCCESS,
    BOOK_PROFILE_CREATE,
    BOOK_PROFILE_CREATE_FAIL,
    BOOK_PROFILE_CREATE_SUCCESS,
} from "containers/book/profile/constants";
import { fetchBooks } from "containers/book/list/actions";

export const fetchBook = id => async dispatch => {
    try {
        dispatch(fetchBookStart());
        const book = await ky.get(`${process.env.REACT_APP_API}/books/${id}`).json();
        dispatch(fetchBookSuccess(book));
    } catch (error) {
        dispatch(fetchBookFail(error));
    }
};

const fetchBookStart = () => ({
    type: BOOK_PROFILE_FETCH,
    payload: {
        loading: true,
    },
});

const fetchBookSuccess = book => ({
    type: BOOK_PROFILE_FETCH_SUCCESS,
    payload: {
        loading: false,
        book,
    },
});

const fetchBookFail = error => ({
    type: BOOK_PROFILE_FETCH_FAIL,
    payload: {
        loading: false,
        error,
    },
});

export const editBook = () => ({
    type: BOOK_PROFILE_EDIT,
    payload: {
        editing: true,
    },
});

export const saveBook = (id, change) => async dispatch => {
    try {
        dispatch(saveBookStart());
        await ky.put(`${process.env.REACT_APP_API}/books/${id}`, { json: change });
        dispatch(saveBookSuccess());
        dispatch(fetchBooks());
    } catch (error) {
        dispatch(saveBookFail(error));
    }
};

export const saveBookSuccess = () => ({
    type: BOOK_PROFILE_SAVE_SUCCESS,
    payload: {
        editing: false,
        loading: false,
        book: null,
    },
});

const saveBookStart = () => ({
    type: BOOK_PROFILE_SAVE,
    payload: {
        editing: false,
        loading: true,
    },
});

const saveBookFail = error => ({
    type: BOOK_PROFILE_SAVE_FAIL,
    payload: {
        editing: false,
        error,
        loading: false,
    },
});

export const changeBook = change => ({
    type: BOOK_PROFILE_CHANGE,
    payload: {
        change,
    },
});

export const createBook = book => async dispatch => {
    try {
        dispatch(createBookStart());
        await ky.post(`${process.env.REACT_APP_API}/books`, { json: book });
        dispatch(createBookSuccess());
        dispatch(fetchBooks());
    } catch (error) {
        dispatch(createBookFail(error));
    }
};

const createBookSuccess = () => ({
    type: BOOK_PROFILE_CREATE_SUCCESS,
    payload: {
        editing: false,
        loading: false,
        book: null,
    },
});

const createBookStart = () => ({
    type: BOOK_PROFILE_CREATE,
    payload: {
        editing: false,
        loading: true,
    },
});

const createBookFail = error => ({
    type: BOOK_PROFILE_CREATE_FAIL,
    payload: {
        editing: false,
        error,
        loading: false,
    },
});
