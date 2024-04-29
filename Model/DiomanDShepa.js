// models/product.js

const mongoose = require('mongoose');

const DiomandShepaSchema = new mongoose.Schema({
  
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        required: true
      },
        name: {
    type: String,
    required: true
  },  images: [{
    type: String // Assuming you store image filenames
}]

});

const DiomandShepa = mongoose.model('DiomandShepa', DiomandShepaSchema);

module.exports = DiomandShepa;
