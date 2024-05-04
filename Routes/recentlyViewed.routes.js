// recentlyViewed.routes.js

const express = require('express');
const router = express.Router();
const recentlyViewedController = require('../Controller/recentlyViewed.controller');

// Add recently viewed diamond
router.post('/recentlyViewed', recentlyViewedController.addRecentlyViewed);

// Get recently viewed diamonds
router.get('/recently-viewed', recentlyViewedController.getRecentlyViewed);

module.exports = router;
