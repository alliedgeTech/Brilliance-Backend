const express = require("express");

const router = express.Router();
const Category = require("../Controller/category")

router.post("/AdminDash/categories",Category.AddCotogary)
router.get("/AdminDash/getCatogary",Category.getCatogary)
// router.get('/AdminDash/getAllProducts/:id', AddProductController.getProductById);
// router.put('/AdminDash/getAllProducts/:id', AddProductController.updateProduct);

router.delete('/AdminDash/deletedCatogary/:id', Category.deleteProduct);

module.exports = router;