const express = require("express");

const router = express.Router();
const Category = require("../Controller/Slider")

router.post("/AdminDash/AddSlider",Category.AddSlider)
router.get("/AdminDash/GetSlider",Category.GetSlide)
router.put("/AdminDash/UpdateSlider",Category.UpdateSlider)
router.delete("/AdminDash/DeleteSlider",Category.DeleteSlider)


module.exports = router;