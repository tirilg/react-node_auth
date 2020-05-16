import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function ResetPassword(props) {
    const [newPassword, setNewPassword] = useState('');
    const [newRepeatPassword, setNewRepeatPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const history = useHistory();
    
    function handlePasswordReset() {
        fetch("http://localhost:8080/users/reset-password", {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                        "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: props.match.params.id, 
                newPassword: newPassword,
                newRepeatPassword: newRepeatPassword
            })
        })
        .then(res => {
            console.log(res);
            if (res.ok) {
                setSuccessMessage("Successfully updated password");
                setTimeout(()=> {
                    history.push("/");
                },2000);
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
        <div className="ResetPassword outer-container">
            <h1>Reset password</h1>
            <div className="container">
                <form>
                    <input className={error.includes("missing") || error.includes("password") ? "input-error" : ""}
                        type="password" 
                        name="newPassword"
                        placeholder="New password" 
                        onChange={(e) => setNewPassword(e.target.value)} 
                    />
                    <input className={error.includes("missing") || error.includes("password") ? "input-error" : ""}
                        type="password" 
                        name="newRepeatPassword"
                        placeholder="Repeat new password" 
                        onChange={(e) => setNewRepeatPassword(e.target.value)} 
                    />
                    <button type="button" onClick={handlePasswordReset}>Update password</button>
                </form>
            </div>
            {successMessage ? <p className="error">{successMessage}</p> : ""}
            {error && !successMessage ? <p className="error">{error}</p> : ""}
        </div>
    )
}