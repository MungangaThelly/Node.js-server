const mongoose = require('mongoose');

// Define schema for the item
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, { timestamps: true });

// Create the model
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;



