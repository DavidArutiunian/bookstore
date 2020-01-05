import slice from "./slice";
import api from "services/api";
import { fetchAuthors } from "containers/author/list/actions";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

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
                    date_of_birth: format(parseISO(author.row.date_of_birth), "dd MMMM yyyy", {
                        locale: ru,
                    }),
                },
            }),
        );
    } catch (error) {
        console.error(error);
        dispatch(fetchAuthorFail({ error }));
    }
};

export const saveAuthor = (id, change) => async dispatch => {
    try {
        dispatch(saveAuthorStart());
        await api.put(`author/${id}`, { json: change });
        dispatch(saveAuthorSuccess());
        dispatch(fetchAuthors());
    } catch (error) {
        console.error(error);
        dispatch(saveAuthorFail({ error }));
    }
};

export const createAuthor = author => async dispatch => {
    try {
        dispatch(createAuthorStart());
        await api.post("author", { json: author });
        dispatch(createAuthorSuccess());
        dispatch(fetchAuthors());
    } catch (error) {
        console.error(error);
        dispatch(createAuthorFail({ error }));
    }
};
