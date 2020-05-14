import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    function fetchUser() {
        fetch("http://localhost:8080/users/profile", {
            credentials: "include",
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setUser(data);
            setLoading(false);
        }) 
    }
    
    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>  
        {!loading ? (
            <p>Welcome, {user.username}</p> 
            ):(
            <p>loading</p>
            
            )}
            <h1>Profile</h1>
            {/* {user.username && <p>{user.username}</p>} */}
        </>
    )
}