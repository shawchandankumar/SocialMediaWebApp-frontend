import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class FriendsListItem extends Component {
    
  render() {
    const {friend} = this.props;
    return (
      <div>
        <Link to={`/user/${friend._id}`} >
            <div className='friends-img'>
                <img src='' alt='friend-avatar' />
            </div>
            <div className='friends-name'>{friend.name}</div>
        </Link>
      </div>
    );
  }
}


export default FriendsListItem;
