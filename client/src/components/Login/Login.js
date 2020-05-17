import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./Login.css";

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
            if (res.ok) {
                setIsAuthenticated(true);
                history.push("/goals");
            } else {
                throw res;
            }
        })
        .catch(error => {
            error.json().then(body => {
                setError(body.response);
            })
        })
    }

    return (
        <>
            <div className="Login outer-container">
                <h1>Log in</h1>
                <div className="container">
                    <form>
                        <input className={error.includes("missing") || error.includes("username") ? "input-error" : ""}
                            type="text" 
                            name="username" 
                            placeholder="username" 
                            onChange={e => setUsername(e.target.value)}
                        />

                        <input className={error.includes("missing") || error.includes("password") ? "input-error" : ""}
                            type="password" 
                            name="password" 
                            placeholder="password" 
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button type="button" onClick={handleLogin}>Log in</button>
                    </form>
                    <div className="forgot">
                        Forgot your password? Reset it <a href="/send-reset-password">here</a>
                    </div>
                </div>
                    {error ? <p className="error">{error}</p> : ""}
            </div>
        </>
    )
}