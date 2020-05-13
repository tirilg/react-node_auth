import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Signup() { 
    // Hooks state
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [repeatPassword, setRepeatPassword] = useState();
    const [error, setError] = useState("");

    // History
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
            console.log(res);
            if (res.ok) {
                history.push('/login');
            } else {
                throw res;
            }
        })
        .catch(error => {
            error.json().then(body => {
                console.log(body);
                setError(body.response);
            })
        })
    }

    return (
        <>
            <h1>Sign up</h1>
            <form>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="username" 
                    onChange={e => setUsername(e.target.value)}
                />
                 <input 
                    type="email" 
                    name="email" 
                    placeholder="email" 
                    onChange={e => setEmail(e.target.value)}
                />
                 <input 
                    type="password" 
                    name="password" 
                    placeholder="password" 
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    type="password" 
                    name="repeatPassword" 
                    placeholder="repeat password" 
                    onChange={e => setRepeatPassword(e.target.value)}
                />
                <button type="button" onClick={handleSignUp}>Sign up</button>
            </form>
            <div>
                { error ? <p>{error}</p> : ""}
            </div>
        </>
    )
}