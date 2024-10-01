import React, { useState, useTransition } from 'react';
import { RegisterUser } from '../../../shared/api';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const [loading, setLoading] = useState(false);  // Состояние для индикации загрузки
    const [error, setError] = useState(null);  // Состояние для хранения ошибок
    const [isPending, startTransition] = useTransition();
    const userData = {login: login, password: password};

    const navigate = useNavigate();

    const [isRegistered, setIsRegistered] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault(); //чтобы страница не перегружалась
        setLoading(true);  // Устанавливаем загрузку
        setError(null);    // Сбрасываем ошибку

        try {
            startTransition(async () => {
                const data = await RegisterUser(userData);  // Используем функцию для регистрации
                setMessage(data.status);
                setIsRegistered(true);
            });
        } catch (error) {
            setMessage(error.message); // Показываем сообщение об ошибке
        } finally {
            setLoading(false);  // Отключаем индикацию загрузки после завершения запроса
        }
    };

    const handleLoginRedirect = () => {
        startTransition(() => {
            navigate('/login');
        });
    };

    if (loading) {
        return (
            <div>Загрузка...</div>
        );
    }
    return (
        <div>
            <h2>Registration</h2>
                {isRegistered ? (
                    <div>
                        <p>Вы успешно зарегистрировались!</p>
                        <button onClick={handleLoginRedirect}>Войти</button>
                    </div>
                ) : (
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
                )}
        </div>
    );
};

export default RegistrationForm;