import { ADD_POST, UPDATE_POSTS } from "./actionType";
import {APIUrls} from '../helpers/urls';
import { getTokenFromLocalStorage, getFormData } from '../helpers/utils';

export default function fetchPosts() {
    return (dispatch) => {
        const url = APIUrls.getAllPosts();

        fetch(url)
            .then(response => response.json())
            .then(data => dispatch(updatePosts(data.data.posts)));
    }
}

export function updatePosts(posts) {
    return {
        type: UPDATE_POSTS,
        posts
    };
}

export function addPost (post) {
    return {
        type: ADD_POST,
        post
    };
}

export function createPost (content) {
    return (dispatch) => {
        const url = APIUrls.createPost();

        fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${getTokenFromLocalStorage()}`,
            },
            body: getFormData({ content }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.success) {
                dispatch(addPost(data.data.post));
            }
        });
    }
}
