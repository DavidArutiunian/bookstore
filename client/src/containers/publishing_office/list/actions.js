import api from "services/api";
import {
    PUBLISHING_OFFICE_LIST_FETCH,
    PUBLISHING_OFFICE_LIST_FETCH_FAIL,
    PUBLISHING_OFFICE_LIST_FETCH_SUCCESS,
    PUBLISHING_OFFICE_LIST_DELETE,
    PUBLISHING_OFFICE_LIST_DELETE_FAIL,
    PUBLISHING_OFFICE_LIST_DELETE_SUCCESS,
} from "./constants";

export const fetchPublishingOfficeList = () => async (dispatch, getState) => {
    try {
        dispatch(fetchPublishingOfficeListStart());
        const headers = { authorization: getState().auth.token };
        const offices = await api.get("publishing_office", { headers }).json();
        dispatch(fetchPublishingOfficeListSuccess(offices));
    } catch (error) {
        console.error(error);
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

export const deletePublishingOffice = id => async (dispatch, getState) => {
    try {
        dispatch(deletePublishingOfficeStart());
        const headers = { authorization: getState().auth.token };
        await api.delete(`publishing_office/${id}`, { headers });
        dispatch(deletePublishingOfficeSuccess());
        dispatch(fetchPublishingOfficeList());
    } catch (error) {
        console.error(error);
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
