import slice from "./slice";
import api from "services/api";
import { fetchPublishingOfficeList } from "containers/publishing_office/list/actions";
import date from "services/date";
import QueryService from "services/query";

const {
    fetchAuthorsFail,
    fetchAuthorsStart,
    fetchAuthorsSuccess,
    deleteAuthorError,
    deleteAuthorStart,
    deleteAuthorSuccess,
} = slice.actions;

export const fetchAuthors = order => async (dispatch, getState) => {
    try {
        dispatch(fetchAuthorsStart());
        const headers = { authorization: getState().auth.token };
        const query = QueryService.orderToQuery(order);
        const authors = await api.get(`author?${query}`, { headers }).json();
        const transformed = authors.rows.map(row => ({
            ...row,
            date_of_birth: date.format(row.date_of_birth),
            publishing_office: authors.relations.publishing_office.find(
                relation => relation.id_publishing_office === row.id_publishing_office,
            )?.name,
        }));
        dispatch(fetchAuthorsSuccess({ authors: transformed }));
        dispatch(fetchPublishingOfficeList());
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
