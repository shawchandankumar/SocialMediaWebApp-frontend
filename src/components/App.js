import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import jwt_decode from "jwt-decode";

import fetchPosts from "../actions/posts";
import {
  Home,
  Navbar,
  Page404,
  Signup,
  Settings,
  PrivateRoute,
  ComponentWithRouterProp,
  Profile,
} from "./";
import { authenticateUser } from "../actions/auth";
import { getTokenFromLocalStorage } from "../helpers/utils";
import { fetchUserFriends } from "../actions/friends";


class App extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchPosts());
    const token = getTokenFromLocalStorage();

    if (token) {
      const { name, email, _id } = jwt_decode(token);

      dispatch(
        authenticateUser({
          name,
          email,
          _id,
        })
      );

      dispatch(fetchUserFriends());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
    // console.log(friends);

    return (
      <Router>
        <div>
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <Home posts={posts} friends={friends} isLoggedIn={auth.isLoggedIn} />
              }
            />

            <Route path="login" element={<ComponentWithRouterProp />} />

            <Route path="signup" element={<Signup />} />

            <Route element={<PrivateRoute isLoggedIn={auth.isLoggedIn} />}>
              <Route path="setting" element={<Settings />} />
            </Route>

            <Route element={<PrivateRoute isLoggedIn={auth.isLoggedIn} />}>
              <Route path="users/:userId" element={<Profile />} />
            </Route>

            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
