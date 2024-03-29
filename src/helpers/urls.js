const API_ROOT = `https://codeial.codingninjas.com:8000/api/v2`;

export const APIUrls = {
  login: () => `${API_ROOT}/users/login`,
  signup: () => `${API_ROOT}/users/signup`,
  editProfile: () => `${API_ROOT}/users/edit`,
  getAllPosts: (page = 1, limit = 15) =>
    `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  userProfile: (userId) => `${API_ROOT}/users/${userId}`,
  userFriends: () => `${API_ROOT}/friendship/fetch_user_friends`,
  addFriend: (friendId) =>
    `${API_ROOT}/friendship/create_friendship?user_id=${friendId}`,
  removeFriend: (friendId) =>
  `${API_ROOT}/friendship/remove_friendship?user_id=${friendId}`,
  createPost: () => `${API_ROOT}/posts/create`,
  createComment: () => `${API_ROOT}/comments`,
  searchUsers: (searchText) =>  `${API_ROOT}/users/search?text=${searchText}`,
};
