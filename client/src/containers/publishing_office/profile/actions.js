import {
    PUBLISHING_OFFICE_PROFILE_CHANGE,
    PUBLISHING_OFFICE_PROFILE_FETCH,
    PUBLISHING_OFFICE_PROFILE_FETCH_FAIL,
    PUBLISHING_OFFICE_PROFILE_FETCH_SUCCESS,
    PUBLISHING_OFFICE_PROFILE_EDIT,
} from "./constants";
import ky from "ky";

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
