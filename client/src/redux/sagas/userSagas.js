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
  createUserError,
  createUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  loadUserByIdError,
  loadUserByIdSuccess,
  loadUsersError,
  loadUsersSuccess,
  updateUserError,
  updateUserSuccess,
} from "../actions/usersAction";
import {
  createUserApi,
  deleteUserApi,
  loadUserByIdApi,
  loadUsersApi,
  updateUserApi,
} from "../apis/usersApi";

function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}

function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

function* onLoadUserByIdStartAsync(userId) {
  try {
    const response = yield call(loadUserByIdApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUserByIdSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUserByIdError(error.response.data));
  }
}

function* onLoadUserById() {
  while (true) {
    const {payload: userId} = yield take(types.LOAD_USER_BY_ID_START)
    yield call(onLoadUserByIdStartAsync, userId);
  }
}

function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 200) {
      yield put(createUserSuccess(response.data));
    }
  } catch (error) {
    yield put(createUserError(error.response.data));
  }
}

function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

function* onUpdateUserStartAsync({ payload: { id, formValues } }) {
  try {
    const response = yield call(updateUserApi, id, formValues);
    if (response.status === 200) {
      yield put(updateUserSuccess());
    }
  } catch (error) {
    yield put(updateUserError(error.response.data));
  }
}

function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
    }
  } catch (error) {
    yield put(deleteUserError(error.response.data));
  }
}

function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START);
    yield call(onDeleteUserStartAsync, userId);
  }
}

const userSaga = [
  fork(onLoadUsers),
  fork(onLoadUserById),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
];

export default function* userSagas() {
  yield all([...userSaga]);
}
