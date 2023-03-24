import * as types from "../actions/actionTypes";

const initialState = {
  authors: [],
  loading: false,
  error: null,
};

const authorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_AUTHORS_START:
    case types.CREATE_AUTHOR_START:
    case types.UPDATE_AUTHOR_START:
    case types.DELETE_AUTHOR_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_AUTHORS_SUCCESS:
      return {
        ...state,
        loading: false,
        authors: action.payload,
      };
    case types.CREATE_AUTHOR_SUCCESS:
    case types.UPDATE_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case types.DELETE_AUTHOR_SUCCESS:
      return {
        ...state,
        loading: false,
        authors: state.authors.filter((author) => author.id !== action.payload),
      };
    case types.LOAD_AUTHORS_ERROR:
    case types.CREATE_AUTHOR_ERROR:
    case types.UPDATE_AUTHOR_ERROR:
    case types.DELETE_AUTHOR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authorsReducer;
