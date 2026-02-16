import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// 🔹 Import Chatbot Service
import { loadKnowledge, getChatResponse } from './chatbotService.js';

// Import Routes
import adminRoutes from './routes/adminRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import productRoutes from './routes/productRoutes.js';

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
// (Wrapped in try/catch to prevent server crash if scraping fails)
try {
  await loadKnowledge();
} catch (error) {
  console.error("⚠️ Failed to load chatbot knowledge:", error.message);
}

// ============================
// 🤖 CHATBOT API ROUTE (ADDED)
// ============================
app.post('/api/chatbot', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call the function from chatbotService.js
    const aiReply = await getChatResponse(message);

    // Return the response to the frontend
    res.json({ reply: aiReply });

  } catch (error) {
    console.error("Chatbot Route Error:", error);
    res.status(500).json({ error: "Failed to process chat request" });
  }
});

// ============================
// 📂 OTHER ROUTES
// ============================
app.use('/api/admin', adminRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/products', productRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('Arah Infotech API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});