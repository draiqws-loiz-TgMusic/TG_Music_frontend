import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {RegistrationPage} from '../pages/RegistationPage'
import {AuthenticationPage} from '../pages/AuthenticationPage'
import {ProfilePage} from '../pages/ProfilePage/'
import {MusicPage} from '../pages/MusicPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RegistrationPage/>} /> 
                <Route path="/login" element={<AuthenticationPage/>} /> 
                <Route path="/dashboard" element={<ProfilePage/>} />
                <Route path="/dashboard/music" element={<MusicPage/>} />
            </Routes>
        </Router>
    );
};

export default App;
