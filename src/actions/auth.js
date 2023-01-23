import { APIUrls } from "../helpers/urls";
import { getFormData } from "../helpers/utils";
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED } from "./actionType";

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user
  };
}

export function loginFailed(error) {
  return {
    type: LOGIN_FAILED,
    error
  };
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(startLogin())
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
          localStorage.setItem('token', data.data.token);
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
          localStorage.setItem('token', data.data.token);

          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}
