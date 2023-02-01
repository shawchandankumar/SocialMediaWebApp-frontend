import {ADD_COMMENT, ADD_POST, UPDATE_POSTS} from '../actions/actionType';

export default function posts(state = [], action) {
    
    switch(action.type) {
        case UPDATE_POSTS:
            return action.posts;
        
        case ADD_POST:
            return [action.post, ...state];

        case ADD_COMMENT:
            return (state.map(post => {
                if (post._id === action.postId) {
                    return {
                        ...post,
                        comments: [action.comment, ...post.comments]
                    };
                }
                return post;
            }));
        
        default:
            return state;
    }
}