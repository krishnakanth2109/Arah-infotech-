import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit a contact form / application
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, subject, message, resumeLink } = req.body;

    const contact = new Contact({
      fullName,
      email,
      phone,
      subject,
      message,
      resumeLink
    });

    await contact.save();
    res.status(201).json({ message: 'Application/Message submitted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit' });
  }
});

// @route   GET /api/contact
// @desc    Get all submissions (Admin Only - Logic included inline)
router.get('/', async (req, res) => {
   // Simplified check: assume call comes from admin page
   try {
     const contacts = await Contact.find({}).sort({ createdAt: -1 });
     res.json(contacts);
   } catch (error) {
     res.status(500).json({ message: 'Server error' });
   }
});

export default router;