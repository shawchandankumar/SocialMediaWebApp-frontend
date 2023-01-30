import {
  ADD_FRIEND,
  FETCH_FRIENDS_SUCCESS,
  REMOVE_FRIEND,
} from "../actions/actionType";

const initialFriendsState = [];

export default function friends(state = initialFriendsState, action) {
    
  switch (action.type) {
    case FETCH_FRIENDS_SUCCESS:
      const allFriends = action.friends.map(friend => friend.to_user);
      return [...allFriends];

    case ADD_FRIEND:
      return [...state, action.friend];

    case REMOVE_FRIEND:
      const friends = state.filter(
        (friend) => friend._id !== action.friendId
      );
      return friends;

    default:
      return state;
  }
}
