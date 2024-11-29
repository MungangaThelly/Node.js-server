require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { login, getSecretData } = require('./controllers/authController'); // Adjust path as necessary
const itemRoutes = require('./routes/itemRoutes'); // Import item routes
const connectDB = require('./config/db'); // Import DB connection function
const authRoutes = require('./routes/authRoutes');  // or wherever the auth routes are

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
app.use('/api', authRoutes);  // Make sure this matches the route you're using
app.use('/api/items', itemRoutes); // Use item routes for CRUD operations

// Connect to the database
connectDB(); // Now it should work

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
