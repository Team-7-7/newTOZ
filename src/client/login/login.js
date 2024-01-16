import React, { useState } from 'react';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "user" && password === "web_dev") {
            alert("You have successfully logged in.");
            setUsername('');
            setPassword('');
            setErrorMsg(false);
        } else {
            setErrorMsg(true);
        }
    }

    return (
        <form id="login-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="username" 
                id="username-field" 
                className="login-form-field" 
                placeholder="Username" 
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input 
                type="password" 
                name="password" 
                id="password-field" 
                className="login-form-field" 
                placeholder="Password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            {errorMsg && <p id="login-error-msg">Invalid username and/or password</p>}
            <input type="submit" value="Login" id="login-form-submit" />    
        </form>
    );
}

export default LoginForm;