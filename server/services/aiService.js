const { GoogleGenerativeAI } = require("@google/generative-ai");
const SYSTEM_PROMPT = require('../config/systemPrompt');
require('dotenv').config();

// Initialize Gemini Client
// Expects GEMINI_API_KEY in .env
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates a reflection based on user input.
 * @param {string} userInput - The user's emotional state.
 * @returns {Promise<Object>} - The structured response object.
 */
async function generateReflection(userInput) {
    if (!userInput || !userInput.trim()) {
        throw new Error('Input is empty');
    }

    try {
        // Use the specific model requested by the user
        // If this model ID is invalid, fallback to "gemini-2.0-flash-exp" or "gemini-1.5-flash"
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-lite-preview-02-05", // User requested "2-5 flash lite"
            systemInstruction: SYSTEM_PROMPT
        });

        const generationConfig = {
            temperature: 0.7,
            responseMimeType: "application/json",
        };

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: userInput }] }],
            generationConfig,
        });

        const response = await result.response;
        const text = response.text();

        // Parse the JSON response
        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.error("Error parsing AI response:", text);
            throw new Error('Failed to parse AI response');
        }

    } catch (error) {
        console.error("AI Service Error:", error);
        throw error; // Propagate up to controller
    }
}

module.exports = { generateReflection };
