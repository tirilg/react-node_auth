import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./Profile.css";

export default function Profile() {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const history = useHistory();

   /*  function fetchUser() {
        fetch("http://localhost:8080/users/profile", {
            credentials: "include",
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(res.status === 401) {
                return history.push("/");
            } else {
                return res.json();
            }
        })
        .then(data => {
            setUser(data);
            setLoading(false);
        }) 
    }
    
    useEffect(() => {
        fetchUser();
    }, []);
     */

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
                setUser(data);
                setLoading(false);
            }
        }) 
        return () => isFetching = false;
    },[]) 
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