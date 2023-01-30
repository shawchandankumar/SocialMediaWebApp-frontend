import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "../actions/profile";
import { getTokenFromLocalStorage } from '../helpers/utils';
import { APIUrls } from "../helpers/urls";
import { addFriend, removeFriend } from "../actions/friends";


class Profile extends Component {

  constructor (props) {
    super(props);
    this.state = {
      message: null
    };
  }

  componentDidMount() {
    const { userId } = this.props;
    this.props.dispatch(fetchUser(userId));
  }

  checkIfUserIsAFriend = (userId) => {
    const { friends } = this.props;
    console.log(friends)
    let index = friends.map((friend) => friend._id).indexOf(userId);
    return (index !== -1);
  };

  friendshipHelper = async (url) => {
    const option = {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    };

    const response = await fetch(url, option);
    const data = await response.json();
    
    return data;
  }

  handleAddFriendClick = async () => {
    const {userId: friendId, profile: {user}} = this.props;
    const data = await this.friendshipHelper(APIUrls.addFriend(friendId));
    
    if (data.success) {
      this.props.dispatch(addFriend(user));
      this.setState({
        message: "Friendship Established"
      });
    } else {
      this.setState({
        message: data.message
      });
    }
  }

  handleRemoveFriendClick = async () => {
    const {userId: friendId} = this.props;
    const data = await this.friendshipHelper(APIUrls.removeFriend(friendId));

    if (data.success) {
      this.props.dispatch(removeFriend(friendId));
    }

    this.setState({
      message: data.message
    });
  }

  render() {
    const { user, inProgress } = this.props.profile;
    const {message} = this.state;

    if (inProgress) {
      return <h1>Loading!!</h1>;
    }

    const isUserAFriend = this.checkIfUserIsAFriend(this.props.userId);

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

          {!isUserAFriend ? (
            <button onClick={this.handleAddFriendClick}>Add Friend</button>
          ) : (
            <button onClick={this.handleRemoveFriendClick}>Remove Friend</button>
          )}

        {message && <div>{message}</div>}
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
