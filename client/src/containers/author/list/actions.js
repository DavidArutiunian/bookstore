import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import slice from "./slice";
import ky from "ky";

const {
    fetchAuthorsFail,
    fetchAuthorsStart,
    fetchAuthorsSuccess,
    deleteAuthorError,
    deleteAuthorStart,
    deleteAuthorSuccess,
} = slice.actions;

export const fetchAuthors = () => async dispatch => {
    try {
        dispatch(fetchAuthorsStart());
        const authors = await ky.get(`${process.env.REACT_APP_API}/author`).json();
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
        await ky.delete(`${process.env.REACT_APP_API}/author/${id}`);
        dispatch(deleteAuthorSuccess());
    } catch (error) {
        console.error(error);
        dispatch(deleteAuthorError({ error }));
    }
};
