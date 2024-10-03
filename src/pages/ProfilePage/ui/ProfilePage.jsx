// import "./ProfilePage.css"
import React, { useState, useEffect, useTransition } from 'react';
import { LoginUser } from '../../../shared/api';  // Импортируем функцию из api.js
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProfilePage = () => {
    const [jwt, setJwt] = useState(null);
    const [login, setLogin] = useState(' ');
    const [JwtDec, setJwtDec] = useState({})

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const handleMusicRedirect = () => { startTransition(() => { navigate('/dashboard/music'); }); };

    useEffect(() => {
        setLoading(true);
        try {
            const storedLogin = localStorage.getItem('login');
            const storedJWT = localStorage.getItem('token');

            if (storedJWT) { 
                const storedJwt_dec = jwtDecode(storedJWT);
                setJwt(storedJWT); 
                setJwtDec(storedJwt_dec)
            }
            if (storedLogin) {
                setLogin(storedLogin); 
            }
        }
        catch (error) {
            setMessage(`Error: ${error.message}`); 
        } 
        finally {
            setLoading(false);
        }
    }, []);

    if (!login || !jwt || loading) {
        return <p>Загрузка данных пользователя...</p>; 
    }

    return (
        <>
            <h1> WELCOME TO PROFILE </h1>
            <div>
                <h2>Личный кабинет</h2>
                <p><strong>Login:</strong> {login}</p>
                <p><strong>JWT:</strong> {jwt}</p>
                <p><strong>decode1_JWT:</strong> {new Date(JwtDec.exp * 1000).toLocaleString()} </p>
                <p><strong>decode2_JWT:</strong> {new Date(JwtDec.iat * 1000).toLocaleString()} </p>
                <p><strong>decode3_JWT (login):</strong> {JwtDec.sub[0]}</p>
                <p><strong>decode3_JWT (password):</strong> {JwtDec.sub[1]}</p>
                {/* Отображаем другие данные пользователя */}
            </div>


            <div style={{ marginTop: '20px' }}>
                <p>Вы Хотите послушать музыку?</p>
                <button onClick={handleMusicRedirect}> Слушать </button>
            </div>
        </>
    );
};

export default ProfilePage;
