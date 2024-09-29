import React, { useState, useEffect } from 'react';
import { first_try } from '../shared/api';


const App = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Функция для запроса данных и обновления состояния
    const fetchData = async () => {
        try {
            const result = await first_try();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div>Загрузка...</div>
        );
    }

    if (error) {
        return (
            <div>Ошибка: {error}</div>
        );  
    }

    return (
        <div>
            <h1>Результат:</h1>
            {data ? <p>{data.message}</p> : <p>Нет данных</p>}
        </div>
    );
};

export default App;
