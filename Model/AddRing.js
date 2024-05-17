const mongoose = require('mongoose');

// Define ring schema
const ringSchema = new mongoose.Schema({
    catogary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RingCategory' // Assuming you have a Category model
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sizes: [{ type: String }], // Array of sizes
    colors: [{ type: String }], // Array of colors
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
    images: [{ type: String }],
});

// Create Ring model
const Ring = mongoose.model('Ring', ringSchema);

module.exports = Ring;
