import slice from "./slice";
import api from "services/api";

const {
    fetchTopMostActiveUsersFail,
    fetchTopMostActiveUsersStart,
    fetchTopMostActiveUsersSuccess,
    fetchTopMostPopularBooksFail,
    fetchTopMostPopularBooksStart,
    fetchTopMostPopularBooksSuccess,
} = slice.actions;

export const fetchTopMostActiveUsers = (limit = 10) => async (dispatch, getState) => {
    try {
        dispatch(fetchTopMostActiveUsersStart());
        const headers = { authorization: getState().auth.token };
        const response = await api.get(`customer/top?limit=${limit}`, { headers }).json();
        dispatch(fetchTopMostActiveUsersSuccess({ topMostActiveUsers: response }));
    } catch (error) {
        console.error(error);
        dispatch(fetchTopMostActiveUsersFail({ error }));
    }
};

export const fetchTopMostPopularBooks = (limit = 10) => async (dispatch, getState) => {
    try {
        dispatch(fetchTopMostPopularBooksStart());
        const headers = { authorization: getState().auth.token };
        const response = await api.get(`book/top?limit=${limit}`, { headers }).json();
        dispatch(fetchTopMostPopularBooksSuccess({ topMostPopularBooks: response }));
    } catch (error) {
        console.error(error);
        dispatch(fetchTopMostPopularBooksFail({ error }));
    }
};
