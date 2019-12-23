import slice from "./slice";
import ky from "ky";
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

export const fetchAuthor = id => async dispatch => {
    try {
        dispatch(fetchAuthorStart());
        const author = await ky.get(`${process.env.REACT_APP_API}/author/${id}`).json();
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
        await ky.put(`${process.env.REACT_APP_API}/author/${id}`, { json: change });
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
        await ky.post(`${process.env.REACT_APP_API}/author`, { json: author });
        dispatch(createAuthorSuccess());
        dispatch(fetchAuthors());
    } catch (error) {
        console.error(error);
        dispatch(createAuthorFail({ error }));
    }
};
