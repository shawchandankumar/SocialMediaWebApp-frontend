import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "../actions/profile";


class Profile extends Component {

  componentDidMount() {
    const { userId } = this.props;
    this.props.dispatch(fetchUser(userId));
  }

  render() {
    const { user, inProgress } = this.props.profile;

    if (inProgress) {
      return <h1>Loading!!</h1>;
    }

    return (
      <div className="settings">
        <div className="img-container">
          <img src="" alt="user-dp" />
        </div>

        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{user.email}</div>
        </div>

        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{user.name}</div>
        </div>

        <div className="btn-grp">
          <div>Add Friend</div>
        </div>
      </div>
    );
  }
}

function ProfileWrapper(props) {
  const { userId } = useParams();
  return <Profile {...props} userId={userId} />;
}

const mapStateToProps = ({ profile }) => {
  return {
    profile,
  };
};

export default connect(mapStateToProps)(ProfileWrapper);
