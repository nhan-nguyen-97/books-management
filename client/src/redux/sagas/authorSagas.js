import {
  all,
  call,
  delay,
  fork,
  put,
  takeEvery,
  takeLatest,
  take,
} from "redux-saga/effects";

import * as types from "../actions/actionTypes";
import {
  createAuthorError,
  createAuthorSuccess,
  deleteAuthorError,
  deleteAuthorSuccess,
  loadAuthorsError,
  loadAuthorsSuccess,
  updateAuthorError,
  updateAuthorSuccess,
} from "../actions/authorsAction";
import {
  createAuthorApi,
  deleteAuthorApi,
  loadAuthorsApi,
  updateAuthorApi,
} from "../apis/authorsApi";

function* onLoadAuthorsStartAsync() {
  try {
    const response = yield call(loadAuthorsApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadAuthorsSuccess(response.data));
    }
  } catch (error) {
    yield put(loadAuthorsError(error.response.data));
  }
}

function* onLoadAuthors() {
  yield takeEvery(types.LOAD_AUTHORS_START, onLoadAuthorsStartAsync);
}

function* onCreateAuthorsStartAsync({ payload }) {
  try {
    const response = yield call(createAuthorApi, payload);
    if (response.status === 200) {
      yield put(createAuthorSuccess(response.data));
    }
  } catch (error) {
    yield put(createAuthorError(error.response.data));
  }
}

function* onCreateAuthor() {
  yield takeLatest(types.CREATE_AUTHOR_START, onCreateAuthorsStartAsync);
}

function* onUpdateAuthorsStartAsync({ payload: { id, formValues } }) {
  try {
    const response = yield call(updateAuthorApi, id, formValues);
    if (response.status === 200) {
      yield put(updateAuthorSuccess());
    }
  } catch (error) {
    yield put(updateAuthorError(error.response.data));
  }
}

function* onUpdateAuthor() {
  yield takeLatest(types.UPDATE_AUTHOR_START, onUpdateAuthorsStartAsync);
}

function* onDeleteAuthorsStartAsync(authorId) {
  try {
    const response = yield call(deleteAuthorApi, authorId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteAuthorSuccess(authorId));
    }
  } catch (error) {
    yield put(deleteAuthorError(error.response.data));
  }
}

function* onDeleteAuthor() {
  while (true) {
    const { payload: authorId } = yield take(types.DELETE_AUTHOR_START);
    yield call(onDeleteAuthorsStartAsync, authorId);
  }
}

const authorSaga = [
  fork(onLoadAuthors),
  fork(onCreateAuthor),
  fork(onUpdateAuthor),
  fork(onDeleteAuthor),
];

export default function* authorSagas() {
  yield all([...authorSaga]);
}
