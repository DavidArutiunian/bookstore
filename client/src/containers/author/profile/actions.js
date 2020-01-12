import slice from "./slice";
import api from "services/api";
import date from "services/date";
import { fetchAuthors } from "containers/author/list/actions";

const {
    fetchAuthorStart,
    fetchAuthorSuccess,
    fetchAuthorFail,
    saveAuthorStart,
    saveAuthorSuccess,
    saveAuthorFail,
    createAuthorStart,
    createAuthorSuccess,
    createAuthorFail,
} = slice.actions;

export const fetchAuthor = id => async (dispatch, getState) => {
    try {
        dispatch(fetchAuthorStart());
        const headers = { authorization: getState().auth.token };
        const author = await api.get(`author/${id}`, { headers }).json();
        dispatch(
            fetchAuthorSuccess({
                author: {
                    ...author.row,
                    date_of_birth: date.format(author.row.date_of_birth),
                },
            }),
        );
    } catch (error) {
        console.error(error);
        dispatch(fetchAuthorFail({ error }));
    }
};

export const saveAuthor = (id, change) => async (dispatch, getState) => {
    try {
        dispatch(saveAuthorStart());
        const headers = { authorization: getState().auth.token };
        await api.put(`author/${id}`, { json: change, headers });
        dispatch(saveAuthorSuccess());
        dispatch(fetchAuthors());
    } catch (error) {
        console.error(error);
        dispatch(saveAuthorFail({ error }));
    }
};

export const createAuthor = author => async (dispatch, getState) => {
    try {
        dispatch(createAuthorStart());
        const headers = { authorization: getState().auth.token };
        await api.post("author", { json: author, headers });
        dispatch(createAuthorSuccess());
        dispatch(fetchAuthors());
    } catch (error) {
        console.error(error);
        dispatch(createAuthorFail({ error }));
    }
};
