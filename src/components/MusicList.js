import React, { useState, useEffect } from 'react';
import { fetchMusicByGenre } from '../api';

const MusicList = ({ genre }) => {
    const [music, setMusic] = useState([]);

    useEffect(() => {
        const getMusic = async () => {
            const data = await fetchMusicByGenre(genre);
            setMusic(data.music || []);
        };
        getMusic();
    }, [genre]);

    return (
        <div>
            <h2>{genre} Music</h2>
            <ul>
                {music.map((track) => (
                    <li key={track.id}>
                        {track.name} by {track.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MusicList;
