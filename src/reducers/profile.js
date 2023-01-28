import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILED,
  USER_PROFILE_SUCCESS,
} from "../actions/actionType";

const initialProfileState = {
  user: {},
  success: null,
  error: null,
  inProgress: false,
};

export default function profile(state = initialProfileState, action) {

  switch (action.type) {
    case FETCH_USER_PROFILE:
      return {
        ...state,
        inProgress: true,
      };

    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
        success: true,
        error: null,
        inProgress: false,
      };

    case USER_PROFILE_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };

    default: 
      return state;
  }
}
