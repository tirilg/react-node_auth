import React, { useState, useEffect } from 'react';
import "./Profile.css";

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
        <div className="Profile outer-container"> 
            {!loading ? (
                <div className="container">
                    <h1>Welcome, {user.username}.</h1> 
                </div>
            ):(
                <p>loading profile..</p>
                
            )}
        </div> 
    )
}