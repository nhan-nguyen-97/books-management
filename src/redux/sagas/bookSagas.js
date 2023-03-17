import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import * as types from "../actions/actionTypes";
import {
  createBookError,
  createBookSuccess,
  deleteBookError,
  deleteBookSuccess,
  loadBooksError,
  loadBooksSuccess,
  updateBookError,
  updateBookSuccess,
} from "../actions/booksAction";
import { createBookApi, deleteBookApi, loadBooksApi, updateBookApi } from "../apis/booksApi";

function* onLoadBooksStartAsync() {
  try {
    const response = yield call(loadBooksApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadBooksSuccess(response.data));
    }
  } catch (error) {
    yield put(loadBooksError(error.response.data));
  }
}

function* onLoadBooks() {
  yield takeEvery(types.LOAD_BOOKS_START, onLoadBooksStartAsync);
}

function* onCreateBookStartAsync({ payload }) {
  try {
    const response = yield call(createBookApi, payload);
    if (response.status === 200) {
      yield put(createBookSuccess(response.data));
    }
  } catch (error) {
    yield put(createBookError(error.response.data));
  }
}

function* onCreateBook() {
  yield takeLatest(types.CREATE_BOOK_START, onCreateBookStartAsync);
}

function* onUpdateBookStartAsync({ payload: { id, formValues } }) {
  try {
    const response = yield call(updateBookApi, id, formValues);
    if (response.status === 200) {
      yield put(updateBookSuccess());
    }
  } catch (error) {
    yield put(updateBookError(error.response.data));
  }
}

function* onUpdateBook() {
  yield takeLatest(types.UPDATE_BOOK_START, onUpdateBookStartAsync);
}

function* onDeleteBookStartAsync(bookId) {
  try {
    const response = yield call(deleteBookApi, bookId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteBookSuccess(bookId));
    }
  } catch (error) {
    yield put(deleteBookError(error.response.data));
  }
}

function* onDeleteBook() {
  while (true) {
    const { payload: bookId } = yield take(types.DELETE_BOOK_START);
    yield call(onDeleteBookStartAsync, bookId);
  }
}

export default function* bookSagas() {
  yield fork(onLoadBooks);
  yield fork(onCreateBook);
  yield fork(onDeleteBook);
  yield fork(onUpdateBook);
}
