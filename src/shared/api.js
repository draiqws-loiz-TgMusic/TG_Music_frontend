const API_URL = "http://localhost:8000"; 

export const first_try = async () => {
    const response = await fetch(`${API_URL}/s`);  // используем полный URL
    if (!response.ok) { // Обрабатываем ответ сервера
        throw new Error("Ошибка при запросе данных");
    }
    return response.json();
};

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