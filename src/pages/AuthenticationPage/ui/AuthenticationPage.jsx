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
        setMessage('');  // Сбрасываем предыдущее сообщение

        try {
            // Оборачиваем асинхронную операцию в startTransition
            startTransition(async () => {
                const data = await LoginUser(userData);  // Используем функцию из api.js
                localStorage.setItem('token', data.token);  // Сохраняем токен в localStorage
                setMessage('Login successful!');
                navigate('/dashboard');  // Переход на защищённую страницу после успешного входа
            });
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleRegistrationRedirect = () => {
        navigate('/');
    };

    // Если идет загрузка или переход, показываем индикатор загрузки
    if (loading || isPending) {
        return <div>Загрузка...</div>;
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
