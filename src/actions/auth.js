import { APIUrls } from "../helpers/urls";
import { getFormData, getTokenFromLocalStorage } from "../helpers/utils";
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  AUTHENTICATE_USER,
  LOG_OUT,
  CLEAR_AUTH_ERROR_STATE,
  EDIT_PROFILE_SUCCESSFUL,
  EDIT_PROFILE_FAILED,
} from "./actionType";

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.login();
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormData({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.data.token);
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

export function signup(name, email, password, confirm_password) {
  return (dispatch) => {
    dispatch(startLogin());
    const url = APIUrls.signup();
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: getFormData({ name, email, password, confirm_password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // setting the token in the local storage as it gets wiped out after refresh
          localStorage.setItem("token", data.data.token);

          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOG_OUT,
  };
}

export function clearAuthErrorState() {
  return {
    type: CLEAR_AUTH_ERROR_STATE,
  };
}

export function editProfileSuccessful(user) {
  return {
    type: EDIT_PROFILE_SUCCESSFUL,
    user,
  };
}

export function editProfileFailed(error) {
  return {
    type: EDIT_PROFILE_FAILED,
    error,
  };
}

export function editUser(name, password, confirmPassword, userId) {
  return (dispatch) => {
    const url = APIUrls.editProfile();
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
      body: getFormData({
        name,
        password,
        confirm_password: confirmPassword,
        id: userId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(editProfileSuccessful(data.data.user));
          if (data.data.token) {
            localStorage.setItem('token', data.data.token);
          }
          return;
        }

        dispatch(editProfileFailed(data.message));
      });
  };
}
