import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import jwt_decode from 'jwt-decode';

import fetchPosts from "../actions/posts";
import { Home, Navbar, Page404, Login, Signup } from "./";
import { authenticateUser } from "../actions/auth";

const Setting = () => <div>setting</div>;

const PrivateRoute = ({isLoggedIn}) => {
  return isLoggedIn ? <Outlet /> : <Navigate to="/login"/>;
}


class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    if (token) {
      const { name, email, _id, } = jwt_decode(token);
      this.props.dispatch(authenticateUser({
        name, email, _id
      }));
    }
  }

  render() {
    const {posts, auth} = this.props;

    return (
      <Router>
        <div>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home posts={posts} />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route element={<PrivateRoute isLoggedIn={auth.isLoggedIn} />} >
              <Route path="setting" element={<Setting />} />
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
    auth: state.auth
  };
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
