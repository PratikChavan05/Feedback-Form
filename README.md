# Feedback Collector - MERN Stack Application

A single-page feedback collection application built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to submit feedback and view all submitted feedback entries in an admin view.


## Features

- 📝 User-friendly feedback submission form
- ✅ Form validation with helpful error messages
- 🔄 Loading states for better user experience
- 📱 Fully responsive design for all devices
- 🌓 Dark/light theme toggle
- 👀 Admin view to see all submitted feedback
- 🕒 Timestamp for each submission
- 💾 MongoDB database storage
- 🚀 Deployable to Netlify

## Tech Stack

- **Frontend:**
  - React (built with Vite)
  - Tailwind CSS for styling
  - Lucide React for icons

- **Backend:**
  - Node.js with Express
  - MongoDB for data storage
  - Mongoose ODM

- **Deployment:**
  - Netlify for frontend hosting
  - MongoDB Atlas for database

## Installation

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local or Atlas connection string)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/feedback-collector.git
   cd feedback-collector
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Create environment variables:
   - Create a `.env` file in the `backend` directory
   - Add your MongoDB connection string:
     ```
     MONGODB_URI=your_mongodb_connection_string
     PORT=5000
     ```

## Running Locally

1. Start the backend server:
   ```bash
   # From the backend directory
   npm run dev
   ```

2. In a new terminal, start the frontend development server:
   ```bash
   # From the frontend directory
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
feedback-collector/
├── frontend/          # React application
│   ├── src/           # React source code
│   │   ├── components/# React components
│   │   ├── App.jsx    # Main application component
│   │   └── main.jsx   # Application entry point
│   ├── public/        # Static assets
│   └── package.json   # Frontend dependencies
├── backend/           # Express.js server and API
   ├── models/        # MongoDB models
   ├── routes/        # API routes  
   ├── server.js      # Server entry point
   └── package.json   # Backend dependencies
   
```

## API Endpoints

- `POST /api/submit-feedback` - Submit new feedback
  - Request body: `{ fullName, email, message }`
  - Response: `{ success, message, feedback }`

- `GET /api/feedbacks` - Get all feedback entries
  - Response: Array of feedback objects



## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

##Deployment Link

https://mellifluous-manatee-0d8809.netlify.app/
