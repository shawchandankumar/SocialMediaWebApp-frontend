import {
  FETCH_USER_PROFILE,
  USER_PROFILE_FAILED,
  USER_PROFILE_SUCCESS,
} from "./actionType";
import {APIUrls} from "../helpers/urls";
import { getTokenFromLocalStorage } from "../helpers/utils";


export function userProfileSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}

export function userProfileFailure(error) {
  return {
    type: USER_PROFILE_FAILED,
    error,
  };
}

export function fetchUserProfileStart() {
  return {
    type: FETCH_USER_PROFILE,
  };
}

export function fetchUser(userId) {
  return (dispatch) => {
    dispatch(fetchUserProfileStart());
    const url = APIUrls.userProfile(userId);

    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      }
    })
    .then(response => response.json())
    .then(data => {
        dispatch(userProfileSuccess(data.data.user));
    })
  };
}
