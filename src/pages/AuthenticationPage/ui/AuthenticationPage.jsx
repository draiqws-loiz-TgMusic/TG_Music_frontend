// import "./AuthenticationPage.css"
import React, { useState } from 'react';
import { LoginUser } from '../../../shared/api';  // Импортируем функцию из api.js

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);  // Состояние для индикации загрузки
    const [error, setError] = useState(null);  // Состояние для хранения ошибок

    const userData = {login: login, password: password};

    // Функция для отправки данных формы на сервер
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');  // Сбрасываем предыдущее сообщение

        try {
            const data = await LoginUser(userData);  // Используем функцию из api.js
            localStorage.setItem('token', data.token);  // Сохраняем токен в localStorage
            setMessage('Login successful!');
            // console.log(data.token) - проверка
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <div>Загрузка...</div>
        );
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Login:</label>
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            {/* Отображаем сообщение об ошибке или успешном входе */}
            {message && <p>{message}</p>}
        </div>
    );
};

export default LoginPage;
