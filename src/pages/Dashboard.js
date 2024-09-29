import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user-info/');
        setUserData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        if (error.response && error.response.status === 401) {
          logout();
        }
      }
    };

    fetchUserData();
  }, [logout]);

  return (
    <div>
      <h1>Личный кабинет</h1>
      {userData ? (
        <div>
          <p>Добро пожаловать, {userData.login}!</p>
          {/* Дополнительный функционал */}
        </div>
      ) : (
        <p>Загрузка данных...</p>
      )}
    </div>
  );
};

export default Dashboard;
