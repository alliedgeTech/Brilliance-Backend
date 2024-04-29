// router.js

const express = require("express");
const router = express.Router();
const Category = require("../Controller/Diomand");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        // Use current timestamp as filename to ensure uniqueness
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Set up multer instance
const upload = multer({ storage: storage });

router.post("/AdminDash/DiomandShepa",upload.array('images', 1),Category.createDiomandShape);
router.get("/AdminDash/getDiomandShepa", Category.getDiomandShape);
router.post("/AdminDash/AddDiomandData", upload.array('images', 5), Category.AddDiomandData);
router.get("/AdminDash/getAllDiamonds", Category.getAllDiamonds);
router.delete("/AdminDash/deletedDiomaend/:id", Category.deleteDiamondById);
router.put("/AdminDash/UpadtedDiomaend/:id", Category.updateDiamondById);
router.delete("/AdminDash/deletedDiomandCatogary/:id", Category.DeletedDiomandCatogary);
module.exports = router;
