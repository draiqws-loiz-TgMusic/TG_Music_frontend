const API_URL = "http://localhost:8000"; 

export async function RegisterUser(userData) {
    try {
        const response = await fetch(
            `${API_URL}/registration/`, 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userData),
            }
        );
        if (!response.ok) { // Обрабатываем ответ сервера
            const errorData = await response.json();
            throw new Error(errorData.detail);
        }
        return await response.json();  // Возвращаем JSON-ответ с сервера
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}
export async function LoginUser(userData) {
    try {
        const response = await fetch(
            `${API_URL}/login/`, 
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(userData),
            }
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error during login');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function MusicGenre(genre) {
    try {
        const response = await fetch(
            `${API_URL}/get-music-by-genre/?genre=${encodeURIComponent(genre)}`, 
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(),
            }
        );
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error get music by genre');
        }
        return await response.json();
    } 
    catch (error) {
        throw new Error(error.message);
    }
}

export async function getAllMusic () {
    try {
        const response = await fetch(
            `${API_URL}/get-music-all/`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error get all music');
        }
        return await response.json();
    } 
    catch (error) {
        throw new Error(error.message);
    }
};

