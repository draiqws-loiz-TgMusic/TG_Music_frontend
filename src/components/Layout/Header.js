import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <nav>
        <ul>
          <li><Link to="/">Главная</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/dashboard">Профиль</Link></li>
              <li><button onClick={handleLogout}>Выйти</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Вход</Link></li>
              <li><Link to="/register">Регистрация</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
