import * as actionTypes from "../Actions/actionTypes";

const initialState = {
  storage: true,
  error: null,
  invalidEmail: null,
  invalidPassword: null,
  modelState: false,
  // message: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PASSWORD_ERROR:
      return {
        ...state,
        error: action.errorMessage,
        invalidPassword: action.password,
      };
    case actionTypes.EMAIL_ERROR:
      return {
        ...state,
        error: action.errorMessage,
        invalidEmail: action.email,
      };
    case actionTypes.TOGGLE_MODEL:
      return {
        ...state,
        modelState: action.newState,
      };
    case actionTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        invalidEmail: null,
        invalidPassword: null,
      };
    case actionTypes.STORAGE_UNSET:
      return {
        ...state,
        storage: false,
      };
    case actionTypes.STORAGE_SET:
      return {
        ...state,
        storage: true,
      };
    default:
      return state;
  }
};

export default reducer;
