const express = require('express');
const { login, getSecretData } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authMiddleware

const router = express.Router();

// Public route for login
router.post('/login', login);

// Protected route for secret data - Use authMiddleware to verify token
router.get('/secret', authMiddleware, getSecretData); // Correctly reference authMiddleware here

module.exports = router;
