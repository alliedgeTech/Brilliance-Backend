// router.js

const express = require("express");
const router = express.Router();
const Category = require("../Controller/Diomand");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {

        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { 
        files: 5 
    } 
});

// Routes
router.post("/AdminDash/DiomandShepa", upload.array('images', 5), Category.createDiomandShape);
router.get("/AdminDash/getDiomandShepa", Category.getDiomandShape);
router.post("/AdminDash/AddDiomandData",  upload.array('images1', 5), Category.AddDiomandData);
router.get("/AdminDash/getAllDiamonds", Category.getAllDiamonds);
router.delete("/AdminDash/deletedDiomaend/:id", Category.deleteDiamondById);
router.put("/AdminDash/UpadtedDiomaend/:id", Category.updateDiamondById);
router.delete("/AdminDash/deletedDiomandCatogary/:id", Category.DeletedDiomandCatogary);
router.get("/getAllDiamonds", Category.getAllDiamonds);
router.get("/getDiamondById/:id", Category.getDiamondById);
router.get("/getDiomandShepa", Category.getDiomandShape);

module.exports = router;
