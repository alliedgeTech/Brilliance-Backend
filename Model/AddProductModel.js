const mongoose = require('mongoose');

// Define product schema
const productSchema = new mongoose.Schema({
  selectedCategory:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  size:{
    type:String,
    enum: ["Small", "Medium", "Large",],
    required:true
  },
  price: {
    type: Number,
    required: true
  },
  sellPrice: {
    type: Number,
    required: true
  },

  cut: {
    type: String,
    enum: ["Excellent", "Very Good", "Good", "Fair", "Poor"],
    required: true
  },
  clarity: {
    type: String,
    enum: ["IF", "VVS1", "VVS2", "VS1", "VS2", "SI1", "SI2", "I1", "I2", "I3"],
    required: true
  },
  // color: {
  //   type: String,
  //   enum: ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
  //   required: true
  // },
  images: [{ type: String }],
  
  stockQuantity: {
    type: Number,
    required: true
  }
});

// Create Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
