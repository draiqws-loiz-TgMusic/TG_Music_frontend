import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './apps/App';  // Импортируем основной компонент приложения
import RegistrationForm from './pages/RegistationPage/ui/RegistrationPage';
import AuthenticationPage from './pages/AuthenticationPage/ui/AuthenticationPage'
// Получаем корневой элемент
const rootElement = document.getElementById('root');

// Создаем корень с использованием createRoot
const root = ReactDOM.createRoot(rootElement);

// Рендерим приложение
root.render(
    <React.StrictMode>
        <App />
        <RegistrationForm />
        <AuthenticationPage />
    </React.StrictMode>
);