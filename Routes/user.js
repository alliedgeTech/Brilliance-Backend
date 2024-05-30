const express = require("express");
const router = express.Router();
const verifyToken = require('../Middleware/verifyToken');

const User = require("../Controller/UserController");


// Define your routes and ensure all handlers are correctly referenced

// Route for user login
router.post('/login', User.login);

// Route for user registration
router.post('/register', User.register);

// Route for dashboard access (protected route)
router.get('/dashboard', verifyToken, User.dashboard);

// Route to get all users
router.get('/users', User.getAllUsers);

// Route to handle forgotten passwords
router.post('/forgot-password', User.forgetPass);

// Route to reset password
router.post('/reset-password', User.resetPassword);

// Route to verify OTP
router.post('/verify-otp', User.verifyOTP);

// Route to delete user
router.delete('/users/:userId', User.deleteUser);

module.exports = router;