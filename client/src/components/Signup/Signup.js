import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Signup() { 
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const [error, setError] = useState("");

    const history = useHistory();

    function handleSignUp() {
        fetch("http://localhost:8080/users/signup", {
            method: "POST",
            credentials: "include", 
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                repeatPassword: repeatPassword
            })
        })
        .then(res => {
            if (res.ok) {
                history.push('/');
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
            <div className="Signup outer-container">
                <h1>Sign up</h1>
                <div className="container">
                    <form>
                        <input className={error.includes("missing") || error.includes("username") ? "input-error" : ""}
                            type="text" 
                            name="username" 
                            placeholder="username" 
                            onChange={e => setUsername(e.target.value)}
                        />
                        <input className={error.includes("missing") || error.includes("email") ? "input-error" : ""}
                            type="email" 
                            name="email" 
                            placeholder="email" 
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input className={error.includes("missing") || error.includes("password") ? "input-error" : ""}
                            type="password" 
                            name="password" 
                            placeholder="password" 
                            onChange={e => setPassword(e.target.value)}
                        />
                        <input className={error.includes("missing") || error.includes("password") ? "input-error" : ""}
                            type="password" 
                            name="repeatPassword" 
                            placeholder="repeat password" 
                            onChange={e => setRepeatPassword(e.target.value)}
                        />
                        <button type="button" onClick={handleSignUp}>Sign up</button>
                    </form>
                </div>
                <div>
                    { error ? <p className="error">{error}</p> : ""}
                </div>
            </div>
        </>
    )
}