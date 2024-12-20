const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const mongoose = require('mongoose');

// Create a new item
router.post('/', async (req, res) => {
  const { name, description, price } = req.body;

  // Check if all required fields are present
  if (!name || !description || !price) {
    return res.status(400).json({
      message: 'Validation error: Missing required fields (name, description, price)',
    });
  }

  try {
    const newItem = new Item({ name, description, price });
    await newItem.save();
    res.status(201).json(newItem); // Return the created item with status 201
  } catch (err) {
    res.status(500).json({ message: 'Error creating item', error: err.message });
  }
});

// Get an item by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid item ID format' });
  }

  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item); // Return the found item
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item', error: err.message });
  }
});

// Update an item by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid item ID format' });
  }

  // Optionally validate fields in req.body
  if (req.body.price && isNaN(req.body.price)) {
    return res.status(400).json({ message: 'Invalid price value' });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem); // Return the updated item
  } catch (err) {
    res.status(400).json({ message: 'Error updating item', error: err.message });
  }
});

// Delete an item by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // Check if the ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid item ID format' });
  }

  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted' }); // Confirmation of deletion
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item', error: err.message });
  }
});

module.exports = router;
