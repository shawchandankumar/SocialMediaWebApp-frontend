import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class PostsList extends Component {

  render() {
    const { posts } = this.props;
    // console.log(posts)

    return (
      <div className="posts_list">
        {posts.map((post) => (
          <div className="post-wrapper" key={post._id}>
            <div className="post-header">
              <div className="post-avatar">
                <Link to={`/users/${post.user._id}`} >
                  <img src="" alt="user-avatar" />
                </Link>
                <div>
                  <span className="post-author">{post.user.name}</span>
                  <span className="post-time">a minute ago</span>
                </div>
              </div>

              <div className="post-content">{post.content}</div>

              <div className="post-actions">
                <div className="post-like">
                  <span>10</span>
                </div>
                <div className="post-comments-icon">
                  <span>10</span>
                </div>
              </div>

              <div className="post-comment-box">
                <input placeholder="start typing a comment" />
              </div>

              <div className="post-comment-list">
                <div className="post-comment-item">
                  <div className="post-comment-header">
                    <span className="post-comment-author">
                      {posts[1].comments[0].user.name}
                    </span>
                    <span className="post-comment-time">a minute ago</span>
                    <span className="post-comment-likes">10</span>
                  </div>

                  <div className="post-comment-content">
                    {posts[1].comments[0].content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostsList;
