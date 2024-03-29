import React, { Component } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import { clearAuthErrorState, login } from "../actions/auth";

class Login extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthErrorState());
  };

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };

  render() {
    const {error, inProgress, isLoggedIn} = this.props.auth;
    const {state} = this.props.location;
    const {from} = state || {from: {location: {pathname: '/'}}}

    if (isLoggedIn) {
      return <Navigate to={from.location.pathname} />;
    }

    return (
      <form className="login-form">
        <span className="login-signup-header">Log In</span>
        {error && <div className='alert error-dailog'>{error}</div>}
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            onChange={this.handleInputChange}
            value={this.state.email}
          />
        </div>

        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            name='password'
            onChange={this.handleInputChange}
            value={this.state.password}
          />
        </div>

        <div className="field">
          <button type="submit" onClick={this.handleFormSubmit} disabled={inProgress} >
            Log In
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Login);
