import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { login as loginUser } from '../../services/auth';

const Login = () => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(loginInput, password);
      login(response.data.access_token);
      // Перенаправление на личный кабинет
    } catch (error) {
      console.error(error.response?.data);
      setError(error.response?.data?.detail || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={loginInput}
        onChange={(e) => setLoginInput(e.target.value)}
        placeholder="Логин"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
        required
      />
      <button type="submit">Войти</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;
