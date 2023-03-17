import * as types from "./actionTypes";

export const loadBooksStart = () => ({
  type: types.LOAD_BOOKS_START,
});

export const loadBooksSuccess = (books) => ({
  type: types.LOAD_BOOKS_SUCCESS,
  payload: books,
});

export const loadBooksError = (error) => ({
  type: types.LOAD_BOOKS_ERROR,
  payload: error,
});

export const createBookStart = (book) => ({
  type: types.CREATE_BOOK_START,
  payload: book,
});

export const createBookSuccess = () => ({
  type: types.CREATE_BOOK_SUCCESS,
});

export const createBookError = (error) => ({
  type: types.CREATE_BOOK_ERROR,
  payload: error,
});

export const updateBookStart = (bookInfo) => ({
  type: types.UPDATE_BOOK_START,
  payload: bookInfo,
});

export const updateBookSuccess = () => ({
  type: types.UPDATE_BOOK_SUCCESS,
});

export const updateBookError = (error) => ({
  type: types.UPDATE_BOOK_ERROR,
  payload: error,
});

export const deleteBookStart = (bookId) => ({
  type: types.DELETE_BOOK_START,
  payload: bookId,
});

export const deleteBookSuccess = (bookId) => ({
  type: types.DELETE_BOOK_SUCCESS,
  payload: bookId,
});

export const deleteBookError = (error) => ({
  type: types.DELETE_BOOK_ERROR,
  payload: error,
});
