import { combineReducers } from "redux";

import authorsReducer from "./authorsReducer";
import booksReducer from "./booksReducer";
import userByIdReducer from "./userByIdReducer";
import usersReducer from "./usersReducer";

const rootReducer = combineReducers({
  userCurrent: userByIdReducer,
  users: usersReducer,
  books: booksReducer,
  authors: authorsReducer,
});

export default rootReducer;
