const mongoose = require('mongoose');

// Define schema for the item
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true  // Optional: Ensure name is unique
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be a positive number']  // Optional: Ensure price is positive
  },
  category: {  // Optional: Add a category field
    type: String,
    required: false
  },
  image: {  // Optional: Add an image field (URL or binary data)
    type: String,
    required: false
  },
  quantity: {  // Optional: Track item quantity in stock
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Create the model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
