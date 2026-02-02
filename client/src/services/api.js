const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Sends user input to the backend to get a reflection.
 * @param {string} userInput - The user's feeling.
 * @returns {Promise<Object>} - The reflection object.
 */
export async function fetchReflection(userInput) {
    try {
        const response = await fetch(`${API_URL}/reflect`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Something went wrong');
        }

        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}
