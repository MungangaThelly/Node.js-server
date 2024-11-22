require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


// Create an express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/items', require('./routes/itemRoutes')); // Import item routes

// MongoDB connection string from the environment variable
const mongoURI = process.env.MONGO_URI;

// Log the mongoURI to ensure it's loaded correctly
console.log('Mongo URI:', mongoURI);

// Check if mongoURI is undefined
if (!mongoURI) {
  console.error('Error: MONGO_URI is not defined in the .env file');
  process.exit(1); // Exit if the connection string is missing
}

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect without deprecated options
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process on error
  }
};

// Connect to MongoDB
connectDB();


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
