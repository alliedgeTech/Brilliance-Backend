const express = require("express");

const router = express.Router();
const AddProductController = require("../Controller/AddRing")

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

router.post("/AdminDash/AddRing",upload.array('images1', 5),AddProductController.AddProduct)
router.post("/AdminDash/rings",AddProductController.AddRingCatogary)
router.get("/AdminDash/getRing",AddProductController.getRing)
router.put('/AdminDash/UpdatedRing/:id',AddProductController.updatedRing)
router.delete('/AdminDash/DetedRing/:id',AddProductController.DeltedRing)
router.get("/getRing",AddProductController.getRing)
router.get("/getRing/:id",AddProductController.getRingById)
router.post("/AdminDash/Ring",AddProductController.AddRingCatogary)
router.get("/AdminDash/getRingCatogary",AddProductController.getRingCatogary)
router.delete("/AdminDash/delteRingCatogary/:id",AddProductController.delteRingCatogary)
module.exports = router;