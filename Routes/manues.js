const express = require("express");
const router = express.Router();
const Category = require("../Controller/Manues");

router.post("/AdminDash/sub-menu", Category.Submenu);
router.post("/AdminDash/SubmanuesMany", Category.SubmanuesMany);
router.get('/AdminDash/getSubmanues', Category.getSubmanues);
router.get('/getSubmanues', Category.getSubmanues);
router.get('/getSubmanuesMany', Category.getSubmanuesMany);

module.exports = router;
