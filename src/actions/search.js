import { FETCH_SEARCH_RESULT } from "./actionType";
import { APIUrls } from "../helpers/urls";
import { getTokenFromLocalStorage } from '../helpers/utils';

export function searchResult(users) {
  return {
    type: FETCH_SEARCH_RESULT,
    users,
  };
}

export function searchUser(searchText) {
  return (dispatch) => {
    const url = APIUrls.searchUsers(searchText);

    fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            dispatch(searchResult(data.data.users));
        }
    });

  };
}
