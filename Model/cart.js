// models/cart.js

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  productData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diamond', 
    required: function() { return this.category === 'Diamond'; }
  },
  productDataRing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ring', 
    required: function() { return this.category === 'Ring'; }
  },
  quantity: {
    type: Number,
    required: true,
    default: 1 
  }, size: {
    type: String,
    required: true,
    enum: ['small', 'medium', 'large'], 
    default: 'small'
  }
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User' 
//   }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
