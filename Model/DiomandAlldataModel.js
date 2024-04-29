// diamondModel.js
// models/Diamond.js

const mongoose = require('mongoose');

// Define diamond schema
const diamondSchema = new mongoose.Schema({
    shape: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    cut: {
        type: String,
        required: true
    },
    clarity: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sellPrice: {
        type: Number,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    images: [{
        type: String // Assuming you store image filenames
    }]
});

// Create Diamond model
const Diamond = mongoose.model('Diamond', diamondSchema);

module.exports = Diamond;

