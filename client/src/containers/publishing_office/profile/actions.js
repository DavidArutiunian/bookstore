import {
    BOOK_PROFILE_FETCH_FAIL,
    BOOK_PROFILE_FETCH_SUCCESS,
    BOOK_PROFILE_FETCH,
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
    type: BOOK_PROFILE_FETCH,
    payload: {
        loading: true,
    },
});

const fetchPublishingOfficeSuccess = office => ({
    type: BOOK_PROFILE_FETCH_SUCCESS,
    payload: {
        loading: false,
        office,
    },
});

const fetchPublishingOfficeFail = error => ({
    type: BOOK_PROFILE_FETCH_FAIL,
    payload: {
        loading: false,
        error,
    },
});
