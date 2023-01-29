import React, { Component } from 'react';
import {PostsList, FriendsList} from './';

class Home extends Component {
    render() {
        const {posts, friends, isLoggedIn} = this.props;
        return (
            <div>
                <PostsList posts={posts} />
                {isLoggedIn && <FriendsList friends={friends} />}
            </div>
        );
    }
}


export default Home;
