import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MusicList from './components/MusicList';
import MusicUpload from './components/MusicUpload';
import MusicPlayer from './components/MusicPlayer';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setLoggedIn(true);
    };

    return (
        <Router>
            <div>
                <h1>Music Streaming App</h1>
                <Routes>
                    {!loggedIn && (
                        <>
                            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                            <Route path="/register" element={<Register />} />
                        </>
                    )}
                    {loggedIn && (
                        <>
                            <Route path="/music" element={<MusicList genre="hip-hop" />} />
                            <Route path="/upload" element={<MusicUpload />} />
                            <Route path="/player" element={<MusicPlayer trackUrl="/path_to_audio.mp3" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
