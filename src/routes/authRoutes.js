const express = require('express');
const { login, getSecretData } = require('../controllers/authController');

const router = express.Router();

// Public route for login
router.post('/login', login);

// Protected route for secret data
router.get('/secret', getSecretData);

module.exports = router;
