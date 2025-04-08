import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

router.post('/submit-feedback', async (req, res) => {
  try {
    const { fullName, email, message } = req.body;
    
    if (!fullName || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    const newFeedback = new Feedback({
      fullName,
      email,
      message
    });
    
    await newFeedback.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Feedback submitted successfully',
      feedback: newFeedback
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ timestamp: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error retrieving feedbacks:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;