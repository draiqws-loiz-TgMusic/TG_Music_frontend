import React, { useState } from 'react';
import { MusicGenre } from '../../../shared/api';  
const MusicPage = () => {
    const [genre, setGenre] = useState('');  
    const [musicList, setMusicList] = useState([]); 
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);  
    const [playMusic, setPlayMusic] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();  
        setLoading(true); 
        setError(null);   
        setMessage('');

        try {
            const data = await MusicGenre(genre); 
            setMusicList(data); 
            setMessage('Музыка найдена');
        } 
        catch (error) {
            setError(error.message);
            setMusicList([]);  
        } 
        finally {
            setLoading(false);
        }
    };

    const playSong = (songUrl) => {
        setCurrentSong(songUrl); 
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
                    onChange={(e) => setGenre(e.target.value)} 
                    required
                />
                <button type="submit" disabled={loading} onChange={() => setCurrentSong('')}>
                    {loading ? 'Загрузка...' : 'Найти'}
                </button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Отображаем ошибки, если есть */}
            {message && <p>{message}</p>} {/* Отображаем сообщение */}

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
