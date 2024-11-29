require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemRoutes = require('./routes/itemRoutes'); // Import item routes
const connectDB = require('./config/db'); // Import DB connection function

// Create an express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware to set CSP headers globally
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'none'; img-src 'self' data:;");
  next();
});

// Routes
app.use('/api/items', itemRoutes); // Use item routes for CRUD operations

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
