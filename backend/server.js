import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// 🔹 Import Chatbot
import { loadKnowledge, getChatResponse } from './chatbotService.js';

// Import Routes
import adminRoutes from './routes/adminRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';

// Config
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ============================
// 🔥 LOAD CHATBOT KNOWLEDGE
// ============================
await loadKnowledge();

// ============================
// ROUTES
// ============================

app.use('/api/admin', adminRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/applications', applicationRoutes);

// 🔹 Chatbot Route
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: "Message is required." });
    }

    const reply = await getChatResponse(message);

    res.json({ reply });

  } catch (error) {
    console.error("❌ Chatbot Error:", error.message);
    res.status(500).json({
      reply: "Chatbot service temporarily unavailable."
    });
  }
});

// Base Route
app.get('/', (req, res) => {
  res.send('Arah Infotech API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
