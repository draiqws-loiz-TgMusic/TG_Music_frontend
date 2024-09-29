import React, { useState } from 'react';
import { loginUser } from '../api';

const Login = ({ onLoginSuccess }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await loginUser(login, password);
        if (response.status === "Successfully logged in") {
            onLoginSuccess();  // Вызов функции после успешного логина
        } else {
            setMessage(response.detail || response.status);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
