import ky from "ky";
import {
    BOOK_PROFILE_EDIT,
    BOOK_PROFILE_EDITING,
    BOOK_PROFILE_FETCH,
    BOOK_PROFILE_FETCH_FAIL,
    BOOK_PROFILE_FETCH_SUCCESS,
    BOOK_PROFILE_SAVE,
    BOOK_PROFILE_SAVE_FAIL,
    BOOK_PROFILE_SAVE_SUCCESS,
} from "./constants";
import { doOnBooksFetch } from "containers/book-list/actions";

export function doOnBookProfileFetch(id) {
    return async dispatch => {
        try {
            dispatch(doOnBookProfileFetchStart());
            const book = await ky.get(`${process.env.REACT_APP_API}/books/${id}`).json();
            dispatch(doOnBookProfileFetchSuccess(book));
        } catch (error) {
            dispatch(doOnBookProfileFetchFail(error));
        }
    };
}

function doOnBookProfileFetchStart() {
    return {
        type: BOOK_PROFILE_FETCH,
        payload: {
            loading: true,
        },
    };
}

function doOnBookProfileFetchSuccess(book) {
    return {
        type: BOOK_PROFILE_FETCH_SUCCESS,
        payload: {
            loading: false,
            book,
        },
    };
}

function doOnBookProfileFetchFail(error) {
    return {
        type: BOOK_PROFILE_FETCH_FAIL,
        payload: {
            loading: false,
            error,
        },
    };
}

export function donOnBookProfileEditing() {
    return {
        type: BOOK_PROFILE_EDITING,
        payload: {
            editing: true,
        },
    };
}

export function doOnBookProfileSave(id, change) {
    return async dispatch => {
        try {
            dispatch(doOnProfileSaveStart());
            await ky.put(`${process.env.REACT_APP_API}/books/${id}`, { json: change });
            dispatch(doOnProfileSaveSuccess());
            dispatch(doOnBooksFetch());
        } catch (error) {
            dispatch(doOnProfileSaveFail(error));
        }
    };
}

export function doOnProfileSaveSuccess() {
    return {
        type: BOOK_PROFILE_SAVE_SUCCESS,
        payload: {
            editing: false,
            loading: false,
        },
    };
}

export function doOnProfileSaveStart() {
    return {
        type: BOOK_PROFILE_SAVE,
        payload: {
            editing: false,
            loading: true,
        },
    };
}

export function doOnProfileSaveFail(error) {
    return {
        type: BOOK_PROFILE_SAVE_FAIL,
        payload: {
            editing: false,
            error,
            loading: false,
        },
    };
}

export function doOnBookProfileEdit(change) {
    return {
        type: BOOK_PROFILE_EDIT,
        payload: {
            change,
        },
    };
}
