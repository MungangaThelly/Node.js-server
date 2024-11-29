const jwt = require('jsonwebtoken');

// Middleware to check if the user has a valid JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Extract token from the "Authorization" header

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Store user data from the token in the request object
    next(); // Pass control to the next middleware/route handler
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
