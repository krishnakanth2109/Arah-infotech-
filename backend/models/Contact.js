import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String }, // Can be used for Job Title if applying
  message: { type: String },
  // Optional: If you want to store application specific data here as well
  resumeLink: { type: String }, 
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);