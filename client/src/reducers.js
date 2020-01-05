import { combineReducers } from "redux";
import authReducer from "./containers/auth/reducer";
import bookListReducer from "./containers/book/list/reducer";
import bookProfileReducer from "containers/book/profile/reducer";
import publishingOfficeListReducer from "containers/publishing_office/list/reducer";
import publishingOfficeProfileReducer from "containers/publishing_office/profile/reducer";
import authorListSlice from "containers/author/list/slice";
import authorProfileSlice from "containers/author/profile/slice";
import customerListSlice from "containers/customer/list/slice";
import customerProfileSlice from "containers/customer/profile/slice";

export default function createReducer() {
    return combineReducers({
        // auth
        auth: authReducer,
        // book
        bookList: bookListReducer,
        bookProfile: bookProfileReducer,
        // publishing office
        publishingOfficeList: publishingOfficeListReducer,
        publishingOfficeProfile: publishingOfficeProfileReducer,
        // author
        authorList: authorListSlice.reducer,
        authorProfile: authorProfileSlice.reducer,
        // customer
        customerList: customerListSlice.reducer,
        customerProfile: customerProfileSlice.reducer
    });
}
