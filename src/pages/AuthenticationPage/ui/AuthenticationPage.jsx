// AuthenticationPage.jsx
import React, { useState, useTransition } from 'react';
import { LoginUser } from '../../../shared/api';  // Импортируем функцию из api.js
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isPending, startTransition] = useTransition();  // Используем useTransition
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);  // Состояние для индикации загрузки
    const [error, setError] = useState(null);  // Состояние для хранения ошибок

    const userData = {login: login, password: password};

    const handleSubmit = async (e) => { // Функция для отправки данных формы на сервер
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage('');  // Сбрасываем предыдущее сообщение

        try {
            const data = await LoginUser(userData);
            localStorage.setItem('token', data.token);
            setMessage('Login successful')
            startTransition(async () => {
                navigate('/dashboard');  // Переход на защищённую страницу после успешного входа
            });
        } 
        catch (error) { setMessage(`Error: ${error.message}`); } 
        finally { setLoading(false); }
    };

    const handleRegistrationRedirect = () => {
        startTransition(async () => {navigate('/');});
    };

    if (loading || isPending) { return <div>Загрузка...</div>; }

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
                <button type="submit" disabled={loading || isPending}>
                    {loading || isPending ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {message && <p>{message}</p>} {/* Отображаем сообщение об ошибке или успешном входе */}
            <div style={{ marginTop: '20px' }}>
                <p>Вы ещё не зарегистрированы?</p>
                <button onClick={handleRegistrationRedirect}>
                    Зарегистрируйтесь
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
