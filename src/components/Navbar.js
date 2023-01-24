import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { logoutUser } from '../actions/auth';

class Navbar extends Component {

    handleLogoutUser = () => {
        localStorage.removeItem('token');
        this.props.dispatch(logoutUser());
    }

    render() {
        const {isLoggedIn, user} = this.props.auth;
        return (
            <nav className="nav">
                <div className='left-nav'>
                    <Link to={`/`} >
                        <img src='' alt='logo'/>
                    </Link>
                </div>

                <div className="search-container">
                    <img src='' alt="search icon" />
                    <input placeholder='Search' />

                    <div className='search-results'>
                        <ul>
                            <li className="search-results-row">
                                <img src='' alt='user-dp' />
                                <span>John Doe</span>
                            </li>

                            <li className="search-results-row">
                                <img src='' alt='user-dp' />
                                <span>John Doe</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="right-nav">
                    {isLoggedIn &&
                        <Link to={"/setting"}>
                            <div className='user'>
                                <img src='' alt='user-dp' id='user-dp' />
                                <span>{user.name}</span>
                            </div>
                        </Link> 
                    }

                    <div className="nav-links">
                        <ul>
                            {!isLoggedIn && <li>
                                <Link to={`/login`} >Log in</Link>
                            </li>}

                            {isLoggedIn && <li>
                                 <button onClick={this.handleLogoutUser}>Log out</button>
                            </li>}

                            {!isLoggedIn && <li>
                                <Link to={`/signup`} >Sign up</Link>
                            </li>}
                            
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}


const mapStateToProps = ({auth}) => {
    return {auth};
}

export default connect(mapStateToProps)(Navbar);

