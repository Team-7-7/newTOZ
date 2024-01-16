import React from 'react';
import './login.css';
import './login.js';

class Login extends React.Component {
    render() {
        return (
            <main id="main-holder">
                <h1 id="login-header">Welcome to Tower of Zurpalen!</h1>

                <div id="login-error-msg-holder">
                    <p id="login-error-msg">Invalid username <span id="error-msg-second-line">and/or password</span></p> 
                </div>

                <form id="login-form">
                    <input type="text" name="username" id="username-field" className="login-form-field" placeholder="Username" />
                    <input type="password" name="password" id="password-field" className="login-form-field" placeholder="Password" />
                    <input type="submit" value="Login" id="login-form-submit" />    
                </form>
            </main>
        );
    }
}

export default Login;