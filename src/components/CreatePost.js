import React, { Component } from "react";
import { connect } from 'react-redux';

import { createPost } from '../actions/posts';


class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleAddPost = () => {
    this.props.dispatch(createPost(this.state.content));
    this.setState({ content: '' });
  };

  render() {
    return (
      <div className="create-post">
        <textarea
          className="add-post"
          value={this.state.content}
          onChange={this.handleChange}
        />

        <div>
          <button id="add-post-btn " onClick={this.handleAddPost}>
            Add Post
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(CreatePost);

