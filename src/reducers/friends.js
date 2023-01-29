import { FETCH_FRIENDS_SUCCESS } from '../actions/actionType';

const initialFriendsState = [];

export default function friends (state = initialFriendsState, action) {
    switch (action.type) {
        case FETCH_FRIENDS_SUCCESS: 
            return [...action.friends];
        default:
            return state;
    }
}