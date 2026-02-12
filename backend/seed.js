import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js'; // Ensure this path is correct
import connectDB from './config/db.js'; // Ensure this path is correct

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const seedAdmin = async () => {
  try {
    // 1. Clear existing admins
    await Admin.deleteMany();

    // 2. Hash Password
    const salt = await bcrypt.genSalt(10);
    // CHANGE 'admin123' TO YOUR PREFERRED PASSWORD
    const hashedPassword = await bcrypt.hash('admin123', salt); 

    // 3. Create Admin
    const adminUser = {
      email: 'admin@arahinfotech.net', // This will be your login ID
      password: hashedPassword,
    };

    await Admin.create(adminUser);

    console.log('Admin user seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();