import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";

import fetchPosts from "../actions/posts";
import { PostsList, Navbar } from "./";

const Signup = () => <div>Signup</div>;
const Home = () => <div>Home</div>;
const Login = () => <div>Login</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          {/* <PostsList posts={this.props.posts} /> */}

          <ul>
            <li>
              <Link to={`/`}>Home</Link>
            </li>
            <li>
              <Link to={`/login`}>Login</Link>
            </li>
            <li>
              <Link to={`/signup`}>Signup</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
