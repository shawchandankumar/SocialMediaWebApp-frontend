import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGIN_START,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_ERROR_STATE,
  EDIT_PROFILE_FAILED,
  EDIT_PROFILE_SUCCESSFUL,
} from "../actions/actionType";

const initialAuthState = {
  user: {},
  error: null,
  isLoggedIn: false,
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_ERROR_STATE:
      return {
        ...state,
        error: null,
      };

    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: null,
        isLoggedIn: true,
        inProgress: false,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };

    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
      };

    case LOG_OUT:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };

    case EDIT_PROFILE_SUCCESSFUL:
      return {
        ...state,
        user: action.user,
        error: false,
      };

    case EDIT_PROFILE_FAILED:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
}
