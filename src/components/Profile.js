import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "../actions/profile";

class Profile extends Component {
  componentDidMount() {
    const { userId } = this.props;
    this.props.dispatch(fetchUser(userId));
  }

  checkIfUserIsAFriend = (user) => {
    const { friends } = this.props;
    let index = friends.map((friend) => friend.to_user._id).indexOf(user._id);
    return index !== -1;
  };

  render() {
    const { user, inProgress } = this.props.profile;

    if (inProgress) {
      return <h1>Loading!!</h1>;
    }

    const isUserAFriend = this.checkIfUserIsAFriend(user);

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
          {!isUserAFriend ? (
            <button>Add Friend</button>
          ) : (
            <button>Remove Friend</button>
          )}
        </div>
      </div>
    );
  }
}

function ProfileWrapper(props) {
  const { userId } = useParams();
  return <Profile {...props} userId={userId} />;
}

const mapStateToProps = ({ profile, friends }) => {
  return {
    profile,
    friends,
  };
};

export default connect(mapStateToProps)(ProfileWrapper);
