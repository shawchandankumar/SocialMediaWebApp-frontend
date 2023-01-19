import React, { Component } from "react";
import PropTypes from 'prop-types';

class PostsList extends Component {

  render() {
    const { posts } = this.props;

    return (
      <div className="posts_list">
        {posts.map((post) => (
        <div className="post-wrapper" key={post.imdbID}>
            <div className="post-header">

              <div className="post-avatar">
                <img src={post.Poster} />
                <div>
                  <span className="post-author">{post.imdbID}</span>
                  <span className="post-time">a minute ago</span>
                </div>
              </div>

              <div className="post-content">{post.Title}</div>

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
                    <span className="post-comment-author">{post.year}</span>
                    <span className="post-comment-time">a minute ago</span>
                    <span className="post-comment-likes">10</span>
                  </div>

                  <div className="post-comment-content">Random comment</div>
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
  posts: PropTypes.array.isRequired
}

export default PostsList;
