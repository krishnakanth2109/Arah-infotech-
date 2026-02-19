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
import chatRoutes from './routes/chatRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import productRoutes from './routes/productRoutes.js';

// Config
dotenv.config();
connectDB();

const app = express();

// --- CORS Configuration ---
const allowedOrigins = [
  "https://arah-infotech-technology.netlify.app", // Your Production Frontend
  "http://localhost:5173", // Local Vite
  "http://localhost:8080"  // Your current Local port
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // Allows headers like Authorization to work correctly
}));

// Middleware
app.use(express.json()); // Parses JSON body

// ============================
// 🔥 LOAD CHATBOT KNOWLEDGE (ASYNCHRONOUSLY)
// ============================
// We don't 'await' this so the server starts immediately.
// Scraping is handled in the background.
loadKnowledge().catch(error => {
  console.error("⚠️ Failed to load chatbot knowledge in background:", error.message);
});

// ============================
// 🤖 CHATBOT API ROUTE (DYNAMIC SCRAPING)
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
app.use('/api/chat', chatRoutes);
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

