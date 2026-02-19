import express from 'express';
import Groq from 'groq-sdk';
import { websiteContent } from '../config/websiteContent.js';

const router = express.Router();

// Initialize Groq client
// Ensure GROQ_API_KEY is in your .env file
const getGroqClient = () => {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error('GROQ_API_KEY is missing in environment variables');
        return null;
    }
    return new Groq({ apiKey });
};

router.post('/', async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    const groq = getGroqClient();
    if (!groq) {
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are a helpful AI assistant for Arah Infotech.
Your task is to answer questions based ONLY on the following website content.
If the user asks a question that is NOT related to the content provided below (e.g., general knowledge, politics, other companies), you must respond with EXACTLY this sentence: "I am designed to answer questions related to this website." do not add anything else.

WEBSITE CONTENT:
${websiteContent}

Maintain a professional, helpful, and friendly tone. 
FORMATTING INSTRUCTIONS:
- Use Markdown HEADERS (###) for main sections (e.g., ### **Website Designing** 🌐).
- Use BOLD text for key items (e.g., **Corporate Website Design**).
- Use BULLET POINTS (-) for all lists.
- Use EMOJIS in every section header and list item for better visual appeal.
- Separate sections with empty lines for readability.
- Keep answers structured and clean.`
                },
                {
                    role: 'user',
                    content: question,
                },
            ],
            model: 'llama-3.3-70b-versatile', // Updated as llama3-8b-8192 is deprecated
            temperature: 0.5,
            max_tokens: 1024,
        });

        const answer = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate an answer.";

        res.json({ answer });
    } catch (error) {
        console.error('Groq API Error:', error);
        res.status(500).json({ error: 'Failed to fetch response from AI' });
    }
});

export default router;
