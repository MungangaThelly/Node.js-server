const Item = require('../models/Item');

// Create a new item
exports.createItem = async (req, res) => {
    // Input validation
    if (!req.body.name || !req.body.description || !req.body.price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json({ message: 'Item created successfully', item: newItem });
    } catch (err) {
        res.status(500).json({ message: 'Error creating item', error: err.message });
    }
};

// Get all items with pagination
exports.getItems = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const items = await Item.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching items', error: err.message });
    }
};

// Get a single item by ID
exports.getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching item', error: err.message });
    }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
    // Input validation
    if (!req.body.name || !req.body.description || !req.body.price) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).json({ message: 'Error updating item', error: err.message });
    }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting item', error: err.message });
    }
};
