import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/feedback-collector')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', feedbackRoutes);

app.get('/', (req, res) => {
  res.send('Feedback Collector API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});