import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../actions/auth";
import { searchUser } from "../actions/search";

class Navbar extends Component {
  handleLogoutUser = () => {
    localStorage.removeItem("token");
    this.props.dispatch(logoutUser());
  };

  handleUserSearch = (e) => {
    this.props.dispatch(searchUser(e.target.value));
  };

  render() {
    
    const {
      auth: { isLoggedIn, user },
      results,
    } = this.props;

    return (
      <nav className="nav">
        <div className="left-nav">
          <Link to={`/`}>
            <img src="" alt="logo" />
          </Link>
        </div>

        <div className="search-container">
          <img src="" alt="search icon" />
          <input placeholder="Search" onChange={this.handleUserSearch} />

          <div className="search-results">
            <ul>
              {results.length > 0 &&
                results.map((user) => (
                  <li className="search-results-row" key={user._id}>
                    <Link to={`/users/${user._id}`}>
                      <img src="" alt="user-dp" />
                      <span>{user.name}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className="right-nav">
          {isLoggedIn && (
            <Link to={"/setting"}>
              <div className="user">
                <img src="" alt="user-dp" id="user-dp" />
                <span>{user.name}</span>
              </div>
            </Link>
          )}

          <div className="nav-links">
            <ul>
              {!isLoggedIn && (
                <li>
                  <Link to={`/login`}>Log in</Link>
                </li>
              )}

              {isLoggedIn && (
                <li>
                  <button onClick={this.handleLogoutUser}>Log out</button>
                </li>
              )}

              {!isLoggedIn && (
                <li>
                  <Link to={`/signup`}>Sign up</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth, search }) => {
  return { auth, results: search.results };
};

export default connect(mapStateToProps)(Navbar);
