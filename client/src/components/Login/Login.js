import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login(props) { 
    const {
        setIsAuthenticated
    } = props;

    // Hooks state
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

    // History
    const history = useHistory();

    function handleLogin() {
        fetch("http://localhost:8080/users/login", {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username, 
                password: password
            })
        })
        .then (res => {
            console.log(res);
            if (res.ok) {
                setIsAuthenticated(true);
                history.push("/goals");
            } else {
                throw res;
            }
        })
        /* .catch(error => {
            error.json().then(body => {
                console.log(body);
                setError(body.response);
            })
        }) */
    }

    return (
        <>
            <h1>Log in</h1>
            <form>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="username" 
                    onChange={e => setUsername(e.target.value)}
                />

                <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    onChange={e => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleLogin}>Log in</button>
            </form>
            <div>
                {error ? <p>{error}</p> : ""}
            </div>
        </>
    )
}