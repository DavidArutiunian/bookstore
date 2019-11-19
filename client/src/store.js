import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createReducer from "./reducers";

export default function configureStore(initialState = {}) {
    const middlewares = [thunk];
    const enhancers = [applyMiddleware(...middlewares)];

    const composeEnhancers =
        process.env.NODE_ENV !== "production" &&
        typeof window === "object" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
            : compose;

    const store = createStore(createReducer(), initialState, composeEnhancers(...enhancers));

    store.injectedReducers = {};

    if (module.hot) {
        module.hot.accept("./reducers", () => {
            store.replaceReducer(createReducer(store.injectedReducers));
            store.dispatch({ type: "@@REDUCER_INJECTED" });
        });
    }

    return store;
}
