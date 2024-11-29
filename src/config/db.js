const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  // Check if mongoURI is defined
  if (!mongoURI) {
    console.error('Error: MONGO_URI is not defined in the .env file');
    process.exit(1); // Exit if the connection string is missing
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process on error
  }
};

module.exports = connectDB;
