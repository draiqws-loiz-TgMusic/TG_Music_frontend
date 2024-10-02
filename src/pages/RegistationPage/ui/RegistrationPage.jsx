import React, { useState, useTransition } from 'react';
import { RegisterUser } from '../../../shared/api';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const userData = {login: login, password: password};

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(null); 
    const [isPending, startTransition] = useTransition();

    const navigate = useNavigate();

    const [isRegistered, setIsRegistered] = useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true); 
        setError(null);   
        setMessage('');

        try {
            const data = await RegisterUser(userData); 
            setMessage(data.status);
            setIsRegistered(true);
        } 
        catch (error) {setMessage(error.message); setError(error)} 
        finally {setLoading(false);}
    };

    const handleLoginRedirect = () => { startTransition(() => { navigate('/login'); }); };

    if (loading) { return ( <div>Загрузка...</div> ); }
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

                        <div style={{ marginTop: '20px' }}>
                            <p>Вы уже зарегистрированы?</p>
                            <button onClick={handleLoginRedirect}>
                                Войдите
                            </button>
                        </div>
                    </form>
                    
                )}
        </div>
    );
};

export default RegistrationForm;