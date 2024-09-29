import React, { useState } from 'react';
import { register as registerUser } from '../../services/auth';

const Register = () => {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(loginInput, password);
      setSuccess('Регистрация прошла успешно!');
      // Перенаправление на страницу входа или другое действие
    } catch (error) {
      console.error(error.response?.data);
      setError(error.response?.data?.detail || 'Registration failed');
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
      <button type="submit">Зарегистрироваться</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default Register;
