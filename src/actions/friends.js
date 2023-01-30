import { APIUrls } from "../helpers/urls";
import {getTokenFromLocalStorage} from '../helpers/utils';
import { ADD_FRIEND, FETCH_FRIENDS_SUCCESS, REMOVE_FRIEND } from "./actionType";


export function fetchFriendsSuccess (friends) {
    return {
        type: FETCH_FRIENDS_SUCCESS,
        friends
    };
}

export function fetchUserFriends () {
    return (dispatch) => {
        const url = APIUrls.userFriends();
        fetch(url, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                dispatch(fetchFriendsSuccess(data.data.friends));
            }
        })
    }
}


export function addFriend (friend) {
    return {
        type: ADD_FRIEND,
        friend
    };
}

export function removeFriend (friendId) {
    return {
        type: REMOVE_FRIEND,
        friendId
    };
}
