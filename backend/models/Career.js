import mongoose from 'mongoose';

const careerSchema = new mongoose.Schema({
  dept: {
    type: String,
    required: true, // e.g., Engineering, Marketing
  },
  jobRole: {
    type: String,
    required: true, // e.g., Frontend Developer
  },
  skills: {
    type: [String], // Array of strings
    required: true,
  },
  experience: {
    type: String,
    required: true, // e.g., "2-4 years"
  },
  type: {
    type: String,
    required: true, // e.g., Full-time, Contract
  },
  location: {
    type: String,
    required: true, // e.g., Hyderabad, Remote
  },
  postedDate: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Career', careerSchema);