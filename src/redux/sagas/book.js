import { put, takeEvery } from "redux-saga/effects";

import * as types from "../actions/actionTypes";
import { getBooksAPI } from "../apis";
import { getBookSlice } from "../slice/books";


export function* onLoadBooksStartAsync() {
}

export function* onLoadBooks() {
    yield takeEvery(types.LOAD_BOOKS_START, onLoadBooksStartAsync)
}

// const bookSaga = [
//     fork(onLoadBooks)
// ]

export function* getBooksSaga() {
  const books = yield getBooksAPI();
  yield put(getBookSlice(books));
}
