const express = require("express");

const router = express.Router();
const Category = require("../Controller/Filtering")


router.get("/FilteData",Category.getDataFiltering)


module.exports = router;