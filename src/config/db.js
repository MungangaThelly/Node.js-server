const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('YOUR_MONGO_CONNECTION_STRING', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        throw new Error('Failed to connect to MongoDB');
    }
};

module.exports = connectDB;
