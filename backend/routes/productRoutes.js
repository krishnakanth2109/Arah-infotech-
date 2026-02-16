import express from 'express';
import Product from '../models/Product.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to protect admin routes
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// @route   GET /api/products
// @desc    Get all products (Public)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/products
// @desc    Create a product (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    // REMOVED pricing from destructuring
    const { icon, name, tagline, description, features, badge } = req.body;
    
    const featuresArray = Array.isArray(features) ? features : features.split(',').map(f => f.trim());

    const product = new Product({
      icon,
      name,
      tagline,
      description,
      features: featuresArray,
      badge
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    // REMOVED pricing from destructuring
    const { icon, name, tagline, description, features, badge } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.icon = icon || product.icon;
      product.name = name || product.name;
      product.tagline = tagline || product.tagline;
      product.description = description || product.description;
      product.badge = badge !== undefined ? badge : product.badge;

      if (features) {
        product.features = Array.isArray(features) ? features : features.split(',').map(f => f.trim());
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;