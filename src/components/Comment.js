import React, { Component } from "react";

class Comment extends Component {

  render() {
    const {comment} = this.props;
    
    return (
      <div className="post-comment-list">
        <div className="post-comment-item">
          <div className="post-comment-header">
            <span className="post-comment-author">{comment.user.name}</span>
            <span className="post-comment-time">a minute ago</span>
            <span className="post-comment-likes">10</span>
          </div>

          <div className="post-comment-content">{comment.content}</div>
        </div>
      </div>
    );
  }
}

export default Comment;
