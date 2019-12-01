import ky from "ky";
import {
    BOOK_PROFILE_FETCH,
    BOOK_PROFILE_FETCH_FAIL,
    BOOK_PROFILE_FETCH_SUCCESS,
    BOOK_PROFILE_EDIT,
    BOOK_PROFILE_EDITING_DONE,
    BOOK_PROFILE_EDITING,
} from "./constants";

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

export function doOnBookProfileEditingDone() {
    return {
        type: BOOK_PROFILE_EDITING_DONE,
        payload: {
            editing: false,
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
