// models/RingCategory.js

const mongoose = require('mongoose');

const ringCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

const RingCategory = mongoose.model('RingCategory', ringCategorySchema);

module.exports = RingCategory;
