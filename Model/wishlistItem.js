const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
    ProductData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diamond',
    required: true
  },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const WishlistItem = mongoose.model('WishlistItem', wishlistItemSchema);

module.exports = WishlistItem;
