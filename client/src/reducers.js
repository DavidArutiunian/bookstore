import { combineReducers } from "redux";
import authReducer from "./containers/auth/reducer";
import bookListReducer from "./containers/book-list/reducer";

export default function createReducer() {
    return combineReducers({
        auth: authReducer,
        books: bookListReducer,
    });
}
