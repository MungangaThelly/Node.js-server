const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Dummy user data (in real applications, you'd query a database)
const users = [
  { username: 'user1', password: 'password123' } // Plain text password (not secure, but works for the example)
];

// JWT secret key (in real applications, store this in an environment variable)
const SECRET_KEY = 'your_secret_key';

// Login Controller
const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Password check (in this example, passwords are not hashed, but they should be in a real application)
  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  
  res.json({ token });
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
