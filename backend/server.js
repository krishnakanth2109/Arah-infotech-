import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import Routes
import adminRoutes from './routes/adminRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

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

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chat', chatRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('Arah Infotech API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
