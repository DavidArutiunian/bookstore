import {
    PUBLISHING_OFFICE_PROFILE_CHANGE,
    PUBLISHING_OFFICE_PROFILE_FETCH,
    PUBLISHING_OFFICE_PROFILE_FETCH_FAIL,
    PUBLISHING_OFFICE_PROFILE_FETCH_SUCCESS,
    PUBLISHING_OFFICE_PROFILE_EDIT,
    PUBLISHING_OFFICE_PROFILE_SAVE,
    PUBLISHING_OFFICE_PROFILE_SAVE_FAIL,
    PUBLISHING_OFFICE_PROFILE_SAVE_SUCCESS,
    PUBLISHING_OFFICE_PROFILE_CREATE,
    PUBLISHING_OFFICE_PROFILE_CREATE_FAIL,
    PUBLISHING_OFFICE_PROFILE_CREATE_SUCCESS,
} from "./constants";
import ky from "ky";
import { fetchPublishingOfficeList } from "containers/publishing_office/list/actions";

export const fetchPublishingOffice = id => async dispatch => {
    try {
        dispatch(fetchPublishingOfficeStart());
        const office = await ky.get(`${process.env.REACT_APP_API}/publishing_office/${id}`).json();
        dispatch(fetchPublishingOfficeSuccess(office));
    } catch (error) {
        dispatch(fetchPublishingOfficeFail(error));
    }
};

const fetchPublishingOfficeStart = () => ({
    type: PUBLISHING_OFFICE_PROFILE_FETCH,
    payload: {
        loading: true,
    },
});

const fetchPublishingOfficeSuccess = office => ({
    type: PUBLISHING_OFFICE_PROFILE_FETCH_SUCCESS,
    payload: {
        loading: false,
        office,
    },
});

const fetchPublishingOfficeFail = error => ({
    type: PUBLISHING_OFFICE_PROFILE_FETCH_FAIL,
    payload: {
        loading: false,
        error,
    },
});

export const changePublishingOffice = change => ({
    type: PUBLISHING_OFFICE_PROFILE_CHANGE,
    payload: {
        change,
    },
});

export const editPublishingOffice = () => ({
    type: PUBLISHING_OFFICE_PROFILE_EDIT,
    payload: {
        editing: true,
    },
});

export const savePublishingOffice = (id, change) => async dispatch => {
    try {
        dispatch(savePublishingOfficeStart());
        await ky.put(`${process.env.REACT_APP_API}/publishing_office/${id}`, { json: change });
        dispatch(savePublishingOfficeSuccess());
        dispatch(fetchPublishingOfficeList());
    } catch (error) {
        dispatch(savePublishingOfficeFail(error));
    }
};

const savePublishingOfficeStart = () => ({
    type: PUBLISHING_OFFICE_PROFILE_SAVE,
    payload: {
        editing: false,
        loading: true,
    },
});

export const savePublishingOfficeSuccess = () => ({
    type: PUBLISHING_OFFICE_PROFILE_SAVE_SUCCESS,
    payload: {
        editing: false,
        loading: false,
        office: null,
    },
});

const savePublishingOfficeFail = error => ({
    type: PUBLISHING_OFFICE_PROFILE_SAVE_FAIL,
    payload: {
        editing: false,
        error,
        loading: false,
    },
});

export const createPublishingOffice = office => async dispatch => {
    try {
        dispatch(createPublishingOfficeStart());
        await ky.post(`${process.env.REACT_APP_API}/publishing_office`, { json: office });
        dispatch(createPublishingOfficeSuccess());
        dispatch(fetchPublishingOfficeList());
    } catch (error) {
        dispatch(createPublishingOfficeFail(error));
    }
};

const createPublishingOfficeStart = () => ({
    type: PUBLISHING_OFFICE_PROFILE_CREATE,
    payload: {
        editing: false,
        loading: true,
    },
});

const createPublishingOfficeSuccess = () => ({
    type: PUBLISHING_OFFICE_PROFILE_CREATE_SUCCESS,
    payload: {
        editing: false,
        loading: false,
        office: null,
    },
});

const createPublishingOfficeFail = error => ({
    type: PUBLISHING_OFFICE_PROFILE_CREATE_FAIL,
    payload: {
        editing: false,
        error,
        loading: false,
    },
});
