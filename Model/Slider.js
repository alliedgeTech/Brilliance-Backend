const mongoose = require('mongoose');

// Define the schema for Slider
const sliderSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    paragraphText: {
        type: String,
        required: true
    },
    images: [{
        type: String // Assuming you store image paths or URLs
    }]
});

// Create a model for Slider using the schema
const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;
