import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from '../Logout/Logout';
import "./Navbar.css";

export default function Navbar(props) {

    const {
        isAuthenticated,
        setIsAuthenticated
    } = props;

    return (
        <>
            <div className={isAuthenticated ? "Navbar auth" : "Navbar"}>
                <nav>
                    <ul>
                        {isAuthenticated ? (
                            <>
                                <li>
                                    <NavLink to="/goals" activeClassName="selected">
                                        Goals
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/profile" activeClassName="selected">
                                        Profile
                                    </NavLink>
                                </li>
                                <Logout setIsAuthenticated={setIsAuthenticated}/>
                            </>
                        ): (
                            <>
                                <li>
                                    <NavLink exact to="/" activeClassName="selected">
                                        Log in
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signup" activeClassName="selected">
                                        Sign up
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </>
    )
}