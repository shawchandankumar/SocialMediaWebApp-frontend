import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {

    render() {
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
                    <div className='user'>
                        <img src='' alt='user-dp' id='user-dp' />
                        <span>John Doe</span>
                    </div>

                    <div className="nav-links">
                        <ul>
                            <li>
                                <Link to={`/login`} >Log in</Link>
                            </li>
                            <li>
                                <Link to={`/`} >Log out</Link>
                            </li>
                            <li>
                                <Link to={`/signup`} >Sign up</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}


export default Navbar;

