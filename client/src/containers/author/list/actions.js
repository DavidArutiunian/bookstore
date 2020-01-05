import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import slice from "./slice";
import api from "services/api";

const {
    fetchAuthorsFail,
    fetchAuthorsStart,
    fetchAuthorsSuccess,
    deleteAuthorError,
    deleteAuthorStart,
    deleteAuthorSuccess,
} = slice.actions;

export const fetchAuthors = () => async (dispatch, getState) => {
    try {
        dispatch(fetchAuthorsStart());
        const headers = { authorization: getState().auth.token };
        const authors = await api.get("author", { headers }).json();
        const transformed = authors.rows.map(row => ({
            ...row,
            date_of_birth: format(parseISO(row.date_of_birth), "dd MMMM yyyy", { locale: ru }),
            publishing_office: authors.relations.publishing_office.find(
                relation => relation.id_publishing_office === row.id_publishing_office,
            )?.name,
        }));
        dispatch(fetchAuthorsSuccess({ authors: transformed }));
    } catch (error) {
        console.error(error);
        dispatch(fetchAuthorsFail({ error }));
    }
};

export const deleteAuthor = id => async dispatch => {
    try {
        dispatch(deleteAuthorStart());
        await api.delete(`author/${id}`);
        dispatch(deleteAuthorSuccess());
        dispatch(fetchAuthors());
    } catch (error) {
        console.error(error);
        dispatch(deleteAuthorError({ error }));
    }
};
