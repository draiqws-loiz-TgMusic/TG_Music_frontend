import React, { useState } from 'react';
import { uploadMusic } from '../api';

const MusicUpload = () => {
    const [music, setMusic] = useState('');
    const [author, setAuthor] = useState('');
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [message, setMessage] = useState('');

    const handleUpload = async (e) => {
        e.preventDefault();
        const response = await uploadMusic(music, author, name, genre);
        setMessage(response.status || response.detail);
    };

    return (
        <div>
            <h2>Upload Music</h2>
            <form onSubmit={handleUpload}>
                <input type="text" placeholder="Music URL" value={music} onChange={e => setMusic(e.target.value)} />
                <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} />
                <button type="submit">Upload</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default MusicUpload;
