import express from 'express';
import Career from '../models/Career.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Simple Inline Middleware to protect routes (since no separate middleware file requested)
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.adminId = decoded.id;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// @route   GET /api/careers
// @desc    Get all job openings
router.get('/', async (req, res) => {
  try {
    const jobs = await Career.find({}).sort({ postedDate: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/careers/:id
// @desc    Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Career.findById(req.params.id);
    if (job) res.json(job);
    else res.status(404).json({ message: 'Job not found' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/careers
// @desc    Create a job posting (Admin only)
router.post('/', protect, async (req, res) => {
  try {
    const { dept, jobRole, skills, experience, type, location } = req.body;
    
    // Ensure skills is an array (handle comma separated strings if sent that way)
    const skillsArray = Array.isArray(skills) ? skills : skills.split(',').map(s => s.trim());

    const job = new Career({
      dept,
      jobRole,
      skills: skillsArray,
      experience,
      type,
      location,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/careers/:id
// @desc    Update a job posting (Admin only)
router.put('/:id', protect, async (req, res) => {
  try {
    const job = await Career.findById(req.params.id);

    if (job) {
      job.dept = req.body.dept || job.dept;
      job.jobRole = req.body.jobRole || job.jobRole;
      job.experience = req.body.experience || job.experience;
      job.type = req.body.type || job.type;
      job.location = req.body.location || job.location;
      
      if(req.body.skills) {
         job.skills = Array.isArray(req.body.skills) 
            ? req.body.skills 
            : req.body.skills.split(',').map(s => s.trim());
      }

      const updatedJob = await job.save();
      res.json(updatedJob);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/careers/:id
// @desc    Delete a job posting (Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const job = await Career.findById(req.params.id);
    if (job) {
      await job.deleteOne();
      res.json({ message: 'Job removed' });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;