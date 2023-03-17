import { all } from "redux-saga/effects";

import bookSagas from "./bookSagas";
import userSagas from "./userSagas";
import authorSagas from "./authorSagas";

export function* rootSaga() {
  yield all([bookSagas(), userSagas(), authorSagas()]);
}
