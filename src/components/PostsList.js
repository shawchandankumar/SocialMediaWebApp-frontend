import React, { Component } from "react";
import PropTypes from "prop-types";

import { CreatePost, Post } from "./";


class PostsList extends Component {

  render() {
    const { posts } = this.props;

    return (
      <div className="posts_list">
        <CreatePost />
        {posts.map(post => <Post key={post._id} post={post} />)}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
