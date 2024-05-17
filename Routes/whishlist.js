const express = require("express");

const router = express.Router();
const Category = require("../Controller/wishlist.controller")

router.post("/addToWishlist",Category.addToWishlist)
router.get("/getWishlist",Category.getWishlistByUser)
router.delete("/deleteWishList/:id",Category.deleteWishList)
module.exports = router;