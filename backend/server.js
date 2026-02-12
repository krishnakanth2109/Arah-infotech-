import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Import Routes
import adminRoutes from './routes/adminRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Config
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON body

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/contact', contactRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('Arah Infotech API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});