import ky from "ky";
import {
    PUBLISHING_OFFICE_LIST_FETCH,
    PUBLISHING_OFFICE_LIST_FETCH_FAIL,
    PUBLISHING_OFFICE_LIST_FETCH_SUCCESS,
    PUBLISHING_OFFICE_LIST_DELETE,
    PUBLISHING_OFFICE_LIST_DELETE_FAIL,
    PUBLISHING_OFFICE_LIST_DELETE_SUCCESS,
} from "./constants";

export const fetchPublishingOfficeList = () => async dispatch => {
    try {
        dispatch({
            type: PUBLISHING_OFFICE_LIST_FETCH,
            payload: {
                loading: true,
            },
        });
        const offices = await ky.get(`${process.env.REACT_APP_API}/publishing_office`).json();
        dispatch({
            type: PUBLISHING_OFFICE_LIST_FETCH_SUCCESS,
            payload: {
                offices,
                loading: false,
            },
        });
    } catch (error) {
        dispatch({
            type: PUBLISHING_OFFICE_LIST_FETCH_FAIL,
            payload: {
                loading: false,
                error,
            },
        });
    }
};

export const deletePublishingOffice = id => async dispatch => {
    try {
        dispatch({
            type: PUBLISHING_OFFICE_LIST_DELETE,
            payload: {
                loading: true,
            },
        });
        await ky.delete(`${process.env.REACT_APP_API}/publishing_office/${id}`);
        dispatch({
            type: PUBLISHING_OFFICE_LIST_DELETE_SUCCESS,
            payload: {
                loading: false,
            },
        });
        dispatch(fetchPublishingOfficeList());
    } catch (error) {
        dispatch({
            type: PUBLISHING_OFFICE_LIST_DELETE_FAIL,
            payload: {
                loading: false,
                error,
            },
        });
    }
};
