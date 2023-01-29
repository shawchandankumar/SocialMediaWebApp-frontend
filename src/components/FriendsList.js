import React, { Component } from 'react';
import FriendsListItem from './FriendsListItem';

class FriendsList extends Component {
  render() {
    const {friends} = this.props;
    
    return (
      <div className='friends-list'>
        <div className='header'>Friends</div>

        {friends && friends.length === 0 && <div>No Friends found!</div>}

        {friends && friends.map(friend => 
            <FriendsListItem friend={friend.to_user} key={friend._id} />
        )}
      </div>
    );
  }
}


export default FriendsList;
