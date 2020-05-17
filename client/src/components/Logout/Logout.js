import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function Logout(props) {
    
    const {
        setIsAuthenticated
    } = props; 

    const history = useHistory();

    function handleLogOut() {
        fetch('http://localhost:8080/users/logout', {
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            },
            credentials: "include"
        })
        .then(res => {
            if(res.ok) {
                setIsAuthenticated(false);
                history.push("/");
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