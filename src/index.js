import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';  // Импорт компонента App
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Рендерим приложение в элемент с id "root"
);