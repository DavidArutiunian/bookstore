import {
    PUBLISHING_OFFICE_PROFILE_CHANGE,
    PUBLISHING_OFFICE_PROFILE_FETCH,
    PUBLISHING_OFFICE_PROFILE_FETCH_FAIL,
    PUBLISHING_OFFICE_PROFILE_FETCH_SUCCESS,
    PUBLISHING_OFFICE_PROFILE_EDIT,
    PUBLISHING_OFFICE_SAVE,
    PUBLISHING_OFFICE_SAVE_FAIL,
    PUBLISHING_OFFICE_SAVE_SUCCESS,
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

export const savePublishingProfile = (id, change) => async dispatch => {
    try {
        dispatch(savePublishingProfileStart());
        await ky.put(`${process.env.REACT_APP_API}/publishing_office/${id}`, { json: change });
        dispatch(savePublishingProfileSuccess());
        dispatch(fetchPublishingOfficeList());
    } catch (error) {
        dispatch(savePublishingProfileFail(error));
    }
};

const savePublishingProfileStart = () => ({
    type: PUBLISHING_OFFICE_SAVE,
    payload: {
        editing: false,
        loading: true,
    },
});

const savePublishingProfileSuccess = () => ({
    type: PUBLISHING_OFFICE_SAVE_SUCCESS,
    payload: {
        editing: false,
        loading: false,
        office: null,
    },
});

const savePublishingProfileFail = error => ({
    type: PUBLISHING_OFFICE_SAVE_FAIL,
    payload: {
        editing: false,
        error,
        loading: false,
    },
});
