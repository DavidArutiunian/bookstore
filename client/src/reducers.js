import { combineReducers } from "redux";
import authReducer from "./containers/auth/reducer";

export default function createReducer(injectedReducers = {}) {
    return combineReducers({ auth: authReducer, ...injectedReducers });
}
