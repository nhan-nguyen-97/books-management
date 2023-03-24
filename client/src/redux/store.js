import createSagaMiddleware from "@redux-saga/core";
// import { configureStore } from "@reduxjs/toolkit";
import {applyMiddleware, createStore} from "redux";
import logger from "redux-logger";

import { rootSaga } from "./sagas";
// import book from "./slice/book";
// import books from "./slice/books";
// import usersReducer from "./reducers/usersReducer";
import rootReducer from "./reducers/rootReducer";

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middlewares))

// const store = configureStore({
//   reducer: {
//     book,
//     books,
//     usersReducer
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware)
// });

sagaMiddleware.run(rootSaga)

export default store;
