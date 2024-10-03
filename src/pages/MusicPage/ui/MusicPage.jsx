import React, { useState } from 'react';
import { MusicGenre } from '../../../shared/api';  // Импортируем функцию из api.js

const MusicPage = () => {
    const [genre, setGenre] = useState('');  // Состояние для жанра
    const [musicList, setMusicList] = useState([]);  // Состояние для списка музыки
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);  // Для хранения текущей песни для воспроизведения
    const [playMusic, setPlayMusic] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();  // Предотвращаем перезагрузку страницы
        setLoading(true); 
        setError(null);   
        setMessage('');

        try {
            const data = await MusicGenre(genre);  // Запрос на получение музыки по жанру
            setMusicList(data);  // Сохраняем список музыки в состоянии
            setMessage('Музыка найдена');
        } 
        catch (error) {
            setError(error.message);
            setMusicList([]);  // Очищаем список музыки при ошибке
        } 
        finally {
            setLoading(false);
        }
    };

    const playSong = (songUrl) => {
        setCurrentSong(songUrl);  // Устанавливаем URL текущей песни для проигрывания
    };

    return (
        <>
            <h1>Поиск музыки по жанру</h1>

            <form onSubmit={handleSubmit}>
                <label htmlFor="genre">Введите жанр:</label>
                <input
                    type="text"
                    id="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}  // Обновляем состояние при вводе жанра
                    required
                />
                <button type="submit" disabled={loading} onChange={() => setCurrentSong('')}>
                    {loading ? 'Загрузка...' : 'Найти'}
                </button>
            </form>

            {/* Отображаем ошибки, если есть */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Отображаем сообщение */}
            {message && <p>{message}</p>}

            {/* Отображаем список музыки */}
            <div>
                {musicList.length > 0 ? (
                    <ul>
                        {musicList.map((song, index) => (
                            <li key={index}>
                                {/* song[0] - название, song[1] - автор, song[2] - жанр, song[4] - ссылка на песню */}
                                <strong>Название:</strong> {song[1]} | 
                                <strong>Автор:</strong> {song[2]} | 
                                <strong>Жанр:</strong> {song[3]}
                                <br />
                                {/* Добавляем кнопку для проигрывания песни */}
                                {currentSong && (
                                    <h style={{ margin: '20px' }} >Сначала выключите песню</h>
                                )}
                                <button style={{ margin: '20px' }} onClick={
                                    () => {
                                        playSong(song[4]); 
                                        setPlayMusic([0, song[1], song[2]])
                                    }}>
                                    Включить песню
                                </button>
                                <button style={{ margin: '20px' }} onClick={() => window.open(song[4], '_blank')}>
                                    Скачать песню
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p>Нет результатов для данного жанра.</p>
                )}
            </div>

            {/* Элемент для воспроизведения аудио */}
            {currentSong && (
                <div>
                    <h3>Сейчас играет:  {playMusic[1]} Автор {playMusic[2]}</h3>
                    <audio controls>
                        <source src={currentSong} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                    <button onClick={() => setCurrentSong('')}> Выключить </button>
                </div>
            )}
        </>
    );
};

export default MusicPage;
