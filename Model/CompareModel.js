// recentlyViewed.model.js

const mongoose = require('mongoose');

const compareDiomandSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
  diamond: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Diamond',
    required: true
  },
  viewedAt: {
    type: Date,
    default: Date.now
  }
});

const CompareDiomandViewed = mongoose.model('CompareDiomand', compareDiomandSchema);

module.exports = CompareDiomandViewed;
