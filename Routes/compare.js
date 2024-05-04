const express = require("express");

const router = express.Router();
const Category = require("../Controller/Compare")

router.post("/addToComparison",Category.addToComparison)
router.get("/compareView",Category.getComparison)

module.exports = router;