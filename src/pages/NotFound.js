import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Опционально, если хотите добавить стили

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - Страница не найдена</h1>
      <p>Извините, но страница, которую вы ищете, не существует.</p>
      <Link to="/">Вернуться на главную страницу</Link>
    </div>
  );
};

export default NotFound;
