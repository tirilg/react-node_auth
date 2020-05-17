import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./Profile.css";

export default function Profile() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        let isFetching = true

        fetch("http://localhost:8080/users/profile", {
            credentials: "include",
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(isFetching) {
                if(res.status === 401) {
                    return history.push("/");
                } else {
                    return res.json();
                }
            }
        })
        .then(data => {
            if(isFetching) {
                const date = new Date(data.created_at);
                const formattedDate = date.toLocaleDateString("en-us", {day: 'numeric', month: 'long', year: "numeric"});
                data.created_at = formattedDate;
                setUser(data);
                setLoading(false);
            }
        }) 
        return () => isFetching = false;
    },[history]) 


    return (
        <div className="Profile outer-container"> 
            {!loading ? (
                <div className="container">
                    <h1>Welcome, {user.username}.</h1>
                    <p>You have been a member since {user.created_at}</p>
                </div>
            ):(
                <p>loading profile..</p>   
            )}
        </div> 
    )
}