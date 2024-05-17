// routes/cart.js

const express = require('express');
const router = express.Router();
const CartController = require('../Controller/cartController');

// POST route to add an item to the cart
router.post('/add-to-cart', CartController.addToCart);
router.get('/getCard', CartController.getCartItems);
router.delete('/deleteCartItem/:id', CartController.removeCartItems);
module.exports = router;
