import {ADD_POST, UPDATE_POSTS} from '../actions/actionType';

export default function posts(state = [], action) {
    
    switch(action.type) {
        case UPDATE_POSTS:
            return action.posts;
        
        case ADD_POST:
            return [action.post, ...state];
        
        default:
            return state;
    }
}