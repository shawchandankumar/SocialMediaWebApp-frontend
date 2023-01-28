import { UPDATE_POSTS } from "./actionType";
import {APIUrls} from '../helpers/urls';

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