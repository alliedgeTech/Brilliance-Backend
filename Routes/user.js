const express = require("express");
const router = express.Router();

const User = require("../Controller/UserController");


router.post("/login",User.login)
router.post("/register",User.register)
router.get("/users",User.getAllUsers)
router.post("/forgot-password",User.forgetPass)
router.post("/reset-password",User.resetpassword)

// router.route("/check-email").get(EmailCheck)

module.exports = router;