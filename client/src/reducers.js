import { combineReducers } from "redux";
import authReducer from "./containers/auth/reducer";
import bookListReducer from "./containers/book/list/reducer";
import bookProfileReducer from "containers/book/profile/reducer";
import publishingOfficeListReducer from "containers/publishing_office/list/reducer";

export default function createReducer() {
    return combineReducers({
        // auth
        auth: authReducer,
        // book
        bookList: bookListReducer,
        bookProfile: bookProfileReducer,
        // publishing office
        publishingOfficeList: publishingOfficeListReducer,
    });
}
