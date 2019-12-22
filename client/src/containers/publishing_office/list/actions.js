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
        dispatch(fetchPublishingOfficeListStart());
        const offices = await ky.get(`${process.env.REACT_APP_API}/publishing_office`).json();
        dispatch(fetchPublishingOfficeListSuccess(offices));
    } catch (error) {
        dispatch(fetchPublishingOfficeListFail(error));
    }
};

const fetchPublishingOfficeListStart = () => ({
    type: PUBLISHING_OFFICE_LIST_FETCH,
    payload: {
        loading: true,
    },
});

const fetchPublishingOfficeListSuccess = offices => ({
    type: PUBLISHING_OFFICE_LIST_FETCH_SUCCESS,
    payload: {
        offices,
        loading: false,
    },
});

const fetchPublishingOfficeListFail = error => ({
    type: PUBLISHING_OFFICE_LIST_FETCH_FAIL,
    payload: {
        loading: false,
        error,
    },
});

export const deletePublishingOffice = id => async dispatch => {
    try {
        dispatch(deletePublishingOfficeStart());
        await ky.delete(`${process.env.REACT_APP_API}/publishing_office/${id}`);
        dispatch(deletePublishingOfficeSuccess());
        dispatch(fetchPublishingOfficeList());
    } catch (error) {
        dispatch(deletePublishingOfficeFail(error));
    }
};

const deletePublishingOfficeStart = () => ({
    type: PUBLISHING_OFFICE_LIST_DELETE,
    payload: {
        loading: true,
    },
});

const deletePublishingOfficeSuccess = () => ({
    type: PUBLISHING_OFFICE_LIST_DELETE_SUCCESS,
    payload: {
        loading: false,
    },
});

const deletePublishingOfficeFail = error => ({
    type: PUBLISHING_OFFICE_LIST_DELETE_FAIL,
    payload: {
        loading: false,
        error,
    },
});
