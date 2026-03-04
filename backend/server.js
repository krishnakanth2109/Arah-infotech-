import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// 🔹 Import Chatbot Service
import { loadKnowledge, getChatResponse } from './chatbotService.js';

// 🔹 Import Routes
import adminRoutes from './routes/adminRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import productRoutes from './routes/productRoutes.js';
import sidebarRoutes from './routes/sidebarRoutes.js';
// ============================
// ⚙️ CONFIG
// ============================
dotenv.config();
connectDB();

const app = express();

// ============================
// 🌍 CORS CONFIGURATION
// ============================

const allowedOrigins = [
  "https://arah-infotech-technology.netlify.app", // Production Frontend
  "http://localhost:5173", // Vite Local
  "http://localhost:8080"  // Optional local port
];

app.use(cors()); // Allow all origins for development
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests without origin (Postman, curl, mobile apps)
//       if (!origin) return callback(null, true);

//       const allowedOrigins = [
//         "https://arah-infotech-technology.netlify.app",
//         "http://localhost:5173",
//         "http://localhost:8080",
//         "http://localhost:3000"
//       ];

//       if (!allowedOrigins.includes(origin)) {
//         return callback(null, true); // Allow anyway for now
//       }

//       return callback(null, true);
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// ============================
// 🧩 MIDDLEWARE
// ============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
// 🔥 LOAD CHATBOT KNOWLEDGE (Background)
// ============================
// Do NOT await — prevents server crash if scraping fails

loadKnowledge()
  .then(() => {
    console.log("✅ Chatbot knowledge loaded successfully");
  })
  .catch((error) => {
    console.error("⚠️ Failed to load chatbot knowledge:", error.message);
  });

// ============================
// 🤖 CHATBOT ROUTE
// ============================

app.post('/api/chatbot', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const aiReply = await getChatResponse(message);

    res.status(200).json({ reply: aiReply });

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
app.use('/api/sidebar', sidebarRoutes);
// ============================
// 🏠 BASE ROUTE
// ============================

app.get('/', (req, res) => {
  res.send('🚀 Arah Infotech API is running...');
});

// ============================
// 🚀 START SERVER
// ============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});