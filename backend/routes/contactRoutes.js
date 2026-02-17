import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit a contact form
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
    res.status(201).json({ message: 'Message submitted successfully' });
  } catch (error) {
    console.error('Contact POST error:', error);
    res.status(400).json({ message: 'Failed to submit' });
  }
});

// @route   GET /api/contact
// @desc    Get all contact submissions (Admin)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Contact GET error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/contact/:id
// @desc    Delete a contact submission (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Contact DELETE error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;