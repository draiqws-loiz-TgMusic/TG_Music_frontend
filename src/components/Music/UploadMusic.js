import React, { useState } from 'react';
import api from '../../services/api';
import UploadMusic from '../components/Music/UploadMusic';

const UploadMusic = () => {
  const [file, setFile] = useState(null);
  const [author, setAuthor] = useState('');
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('author', author);
    formData.append('name', name);
    formData.append('genre', genre);

    try {
      const response = await api.post('/add-music/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Обработка успешной загрузки
    } catch (error) {
      console.error(error.response.data);
      // Обработка ошибок
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} required />
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Автор"
        required
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название"
        required
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Жанр"
        required
      />
      <button type="submit">Загрузить</button>
    </form>
  );
};

export default UploadMusic;
