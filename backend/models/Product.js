import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true, 
    // Stores icon name like "BarChart3", "Zap"
  },
  name: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: {
    type: [String], // Array of strings
    required: true,
  },
  badge: {
    type: String, // e.g., "Most Popular"
    default: null,
  }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);