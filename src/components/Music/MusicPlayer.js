import React from 'react';

const MusicPlayer = ({ src }) => {
  return (
    <div>
      <h3>Сейчас играет</h3>
      <audio controls>
        <source src={src} type="audio/mpeg" />
        Ваш браузер не поддерживает воспроизведение аудио.
      </audio>
    </div>
  );
};

export default MusicPlayer;
