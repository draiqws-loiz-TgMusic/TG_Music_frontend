const API_URL = "http://localhost:8000";  // URL бекенда

export const registerUser = async (login, password) => {
    const response = await fetch(`${API_URL}/registration/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
    });
    return response.json();
};

export const loginUser = async (login, password) => {
    const response = await fetch(`${API_URL}/authorization/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password })
    });
    return response.json();
};

export const fetchMusicByGenre = async (genre) => {
    const response = await fetch(`${API_URL}/get-music/?genre=${genre}`);
    return response.json();
};

export const uploadMusic = async (music, author, name, genre) => {
    const response = await fetch(`${API_URL}/add-music/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ music, author, name, genre })
    });
    return response.json();
};
