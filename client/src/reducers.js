import { combineReducers } from "redux";
import authReducer from "./containers/auth/reducer";
import bookListReducer from "./containers/book-list/reducer";
import bookProfileReducer from "containers/book-profile/reducer";

export default function createReducer() {
    return combineReducers({
        auth: authReducer,
        booksList: bookListReducer,
        bookProfile: bookProfileReducer,
    });
}
