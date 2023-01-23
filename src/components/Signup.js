import React, { Component } from "react";
import { connect } from "react-redux";
import { signup } from "../actions/auth";

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirm_password: ""
    };
  }


  handleInputChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    const { name, email, password, confirm_password } = this.state;
    if (name && email && password && confirm_password) {
      this.props.dispatch(signup(name, email, password, confirm_password));
    }
  };

  render() {
    const {error, inProgress, isLoggedIn} = this.props.auth;
    return (
      <form className="signup-form">
        <span className="login-signup-header">Sign Up</span>

        {error && <div className='alert error-dailog'>{error}</div>}

        <div className="field">
          <input
            type="text"
            placeholder="Name"
            name='name'
            required
            onChange={this.handleInputChange}
            value={this.state.name}
          />
        </div>

        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            name='email'
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
          <input
            type="password"
            placeholder="Confirm Password"
            required
            name='confirm_password'
            onChange={this.handleInputChange}
            value={this.state.confirm_password}
          />
        </div>

        <div className="field">
          <button
            type="submit"
            onClick={this.handleFormSubmit}
            disabled={inProgress}
            >
            Sign Up
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({auth}) => {
    return {auth};
};

export default connect(mapStateToProps)(Signup);
