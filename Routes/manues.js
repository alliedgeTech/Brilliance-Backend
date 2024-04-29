const express = require("express");

const router = express.Router();
const Category = require("../Controller/Manues")

router.post("/AdminDash/main-menu",Category.Mainmenu)
router.post("/AdminDash/sub-menu",Category.Submenu)
router.post("/AdminDash/SubmanuesMany",Category.SubmanuesMany)
router.get('/AdminDash/getManues', Category.getManues);
router.get('/AdminDash/getSubmanues', Category.getSubmanues);
// router.put('/AdminDash/getAllProducts/:id', AddProductController.updateProduct);

// router.delete('/AdminDash/deletedCatogary/:id', Category.deleteProduct);

module.exports = router;