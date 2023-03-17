import * as types from "../actions/actionTypes";

const initialState = {
  books: [],
  loading: false,
  error: null,
};

const booksReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_BOOKS_START:
    case types.CREATE_BOOK_START:
    case types.UPDATE_BOOK_START:
    case types.DELETE_BOOK_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: action.payload,
      };
    case types.CREATE_BOOK_SUCCESS:
    case types.UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.DELETE_BOOK_SUCCESS:
      return {
        ...state,
        loading: false,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case types.LOAD_BOOKS_ERROR:
    case types.CREATE_BOOK_ERROR:
    case types.UPDATE_BOOK_ERROR:
    case types.DELETE_BOOK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default booksReducer;
