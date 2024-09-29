import React, { useState } from 'react';
import { RegisterUser } from '../../../shared/api';  // Импортируем функцию из api.js

const RegistrationForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);  // Состояние для индикации загрузки
    const [error, setError] = useState(null);  // Состояние для хранения ошибок

    const userData = {login: login, password: password};
    
    const handleSubmit = async (e) => {
        e.preventDefault(); //чтобы страница не перегружалась
        setLoading(true);  // Устанавливаем загрузку
        setError(null);    // Сбрасываем ошибку

        try {
            const data = await RegisterUser(userData);  // Используем функцию для регистрации
            setMessage(data.status);
        } catch (error) {
            setMessage(error.message); // Показываем сообщение об ошибке
        } finally {
            setLoading(false);  // Отключаем индикацию загрузки после завершения запроса
        }
    };
    if (loading) {
        return (
            <div>Загрузка...</div>
        );
    }
    return (
        <div>
            <h2>Registration</h2>
                <form onSubmit={handleSubmit}>  {/*После события сработает функция*/}
                <div>
                    <label>Login:</label> {/*Будет внутри поля написано*/}
                    <input
                        type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required //Обязательно для заполнения
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
                <button type="submit">Register</button>  
                {message && <p>{message}</p>} {/* Событие полсе нажаатия на кнопку Button  */}
            </form>
        </div>
    );
};

export default RegistrationForm;
