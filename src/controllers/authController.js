require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Dummy user data (in a real application, you'd query a database)
const users = [
  { username: 'user1', password: '$2a$10$XGAtIz3DquczmMZsUPlOyuEfp3.vtXY0XI5.Oy1hCakm/iMK5v/xu' } // bcrypt hashed password for 'password123'
];

// JWT secret key (read from environment variable)
const SECRET_KEY = process.env.SECRET_KEY;

// Login Controller
const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare the hashed password using bcrypt
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      return res.status(500).json({ message: 'Error comparing passwords', error: err });
    }
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  });
};

// Protected Route Controller (secret data)
const getSecretData = (req, res) => {
  // Verify JWT token
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  
  try {
    // Verify token
    jwt.verify(token, SECRET_KEY);
    // Return secret data
    res.json({ secret: 'This is the secret data!' });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = { login, getSecretData };
