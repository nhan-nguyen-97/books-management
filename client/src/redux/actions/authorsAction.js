import * as types from "./actionTypes";

export const loadAuthorsStart = () => ({
  type: types.LOAD_AUTHORS_START,
});

export const loadAuthorsSuccess = (author) => ({
  type: types.LOAD_AUTHORS_SUCCESS,
  payload: author,
});

export const loadAuthorsError = (error) => ({
  type: types.LOAD_AUTHORS_ERROR,
  payload: error,
});

export const createAuthorStart = (author) => ({
  type: types.CREATE_AUTHOR_START,
  payload: author
});

export const createAuthorSuccess = () => ({
  type: types.CREATE_AUTHOR_SUCCESS,
});

export const createAuthorError = (error) => ({
  type: types.CREATE_AUTHOR_ERROR,
  payload: error,
});

export const updateAuthorStart = (authorInfo) => ({
  type: types.UPDATE_AUTHOR_START,
  payload: authorInfo
});

export const updateAuthorSuccess = () => ({
  type: types.UPDATE_USER_SUCCESS,
});

export const updateAuthorError = (error) => ({
  type: types.UPDATE_AUTHOR_ERROR,
  payload: error,
});

export const deleteAuthorStart = (authorId) => ({
  type: types.DELETE_AUTHOR_START,
  payload: authorId
});

export const deleteAuthorSuccess = (authorId) => ({
  type: types.DELETE_AUTHOR_SUCCESS,
  payload: authorId
});

export const deleteAuthorError = (error) => ({
  type: types.DELETE_AUTHOR_ERROR,
  payload: error,
});