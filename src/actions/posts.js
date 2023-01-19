import { UPDATE_POSTS } from "./actionType";

export default function fetchPosts() {
    return (dispatch) => {
        const url = `http://www.omdbapi.com/?apikey=3ca5df7&s=superman`;

        fetch(url)
            .then(response => response.json())
            .then(data => dispatch(updatePosts(data.Search)));
    }
}

export function updatePosts(posts) {
    return {
        type: UPDATE_POSTS,
        posts
    };
}