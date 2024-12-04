const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // You will hash this later
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'user' },  // Optional: You can add roles like 'admin', 'user', etc.
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
