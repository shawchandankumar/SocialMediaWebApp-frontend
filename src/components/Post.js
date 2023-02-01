import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { Comment } from "./";
import { createComment } from '../actions/posts';


class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commentContent: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      commentContent: e.target.value,
    });
  };

  handleAddComment = (comment, postId) => {
    const { dispatch } = this.props;
    
    dispatch(createComment(comment, postId));
    this.setState({
      commentContent: "",
    });
  };

  render() {
    const { post } = this.props;

    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <Link to={`/users/${post.user._id}`}>
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
            <input
              placeholder="start typing a comment"
              value={this.state.commentContent}
              onChange={this.handleChange}
            />
            <div>
              <button
                onClick={() => this.handleAddComment(this.state.commentContent, post._id)}
              >
                Add comment
              </button>
            </div>
          </div>

          {post.comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    );
  }
}

export default connect()(Post);
