import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Logout(props) {
    
    const {
        setIsAuthenticated
    } = props; 

    function handleLogOut() {
        fetch('http://localhost:8080/users/logout', {
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(res => {
            console.log(res);
            if(res.ok) {
                setIsAuthenticated(false);
            }
        })
        .catch(error => {
            console.log("Unable to log out")
        }) 
    }
    return (
        <li onClick={handleLogOut}>
            <NavLink to="/logout" activeClassName="selected"> 
                Log out              
            </NavLink>
        </li>
    )
}