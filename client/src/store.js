import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import createReducer from "./reducers";
import persistState, { mergePersistedState } from "redux-localstorage";
import adapter from "redux-localstorage/lib/adapters/sessionStorage";
import filter from "redux-localstorage-filter";

export default function configureStore(persistPaths = [], initialState = {}) {
    const reducer = compose(mergePersistedState())(createReducer());
    const filters = persistPaths.map(key => filter(key));
    const storage = compose(...filters)(adapter(window.sessionStorage));

    const middleware = [thunk];

    const composeEnhancers =
        process.env.NODE_ENV !== "production" &&
        typeof window === "object" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;

    const enhancer = composeEnhancers(applyMiddleware(...middleware), persistState(storage));

    return createStore(reducer, initialState, enhancer);
}
