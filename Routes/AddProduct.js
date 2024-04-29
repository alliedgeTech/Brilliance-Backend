const express = require("express");

const router = express.Router();
const AddProductController = require("../Controller/AddProductController")

const multer = require('multer');
// const maxSize = 500 * 1024; 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ 
  storage: storage, 
  // limits: { fileSize: maxSize } 
});

router.post("/AdminDash/Product",upload.array('images', 5),AddProductController.AddProduct)
router.get("/AdminDash/getAllProducts",AddProductController.getAllProducts)
router.get('/AdminDash/getAllProducts/:id', AddProductController.getProductById);
router.put('/AdminDash/updateProduct/:id', AddProductController.updateProduct);

router.delete('/AdminDash/deleteProduct/:id', AddProductController.deleteProduct);

module.exports = router;