import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {RegistrationPage} from '../pages/RegistationPage'
import {AuthenticationPage} from '../pages/AuthenticationPage'
import {ProfilePage} from '../pages/ProfilePage/'

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Домашняя страница с регистрацией */}
                <Route path="/" element={<RegistrationPage/>} />

                {/* Другие страницы */}
                <Route path="/login" element={<AuthenticationPage/>} />

                <Route path="/dashboard" element={<ProfilePage/>} />
            </Routes>
        </Router>
    );
};

export default App;
