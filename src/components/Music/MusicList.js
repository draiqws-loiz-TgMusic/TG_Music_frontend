import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import MusicPlayer from './MusicPlayer';

const MusicList = () => {
  const [musicList, setMusicList] = useState([]);
  const [genre, setGenre] = useState('');
  const [currentTrack, setCurrentTrack] = useState(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const response = await api.get('/get-music/', { params: { genre } });
        setMusicList(response.data.music);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchMusic();
  }, [genre]);

  return (
    <div>
      <h2>Список музыки</h2>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Все жанры</option>
        <option value="rock">Рок</option>
        <option value="pop">Поп</option>
        {/* Добавьте другие жанры */}
      </select>
      <ul>
        {musicList.map((track) => (
          <li key={track.id}>
            {track.author} - {track.name}
            <button onClick={() => setCurrentTrack(track.music)}>Воспроизвести</button>
          </li>
        ))}
      </ul>
      {currentTrack && <MusicPlayer src={currentTrack} />}
    </div>
  );
};

export default MusicList;
