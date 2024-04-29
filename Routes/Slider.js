const express = require("express");

const router = express.Router();
const Category = require("../Controller/Slider")

router.post("/AdminDash/AddSlider",Category.AddSlider)


module.exports = router;