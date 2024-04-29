const AddProDuctModel = require("../Model/AddProductModel")
const sharp = require('sharp');
module.exports.AddProduct = async (req, res) => {
  try {
    const {

      name,
      description,
      size,
      price,
      sellPrice,
      
      cut,
      clarity,
      color,
      
      stockQuantity,selectedCategory
    } = req.body;
    const images = req.files.map(file => file.filename);
    console.log(images)

    // Create a new Product instance
    const newProduct = new AddProDuctModel({
      name,
      description,
      size,
      price,
      sellPrice,
      
      
      cut,
      clarity,
      color,
      images,
      stockQuantity,selectedCategory
    });

    // Save the product to the database
    await newProduct.save();

    // Respond with success message
    res.status(201).json({ success: true, message: 'Product added successfully', product: newProduct });
  } catch (error) {
    // Handle errors
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
  };   


  module.exports.getAllProducts = async (req, res) => {
    try {
      // Fetch all products from the database
      const products = await AddProDuctModel.find();
  
      // Return the products as JSON response
      res.status(200).json(products);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  };
  module.exports.getProductById = async (req, res) => {
    try {
      // Extract the product ID from the request parameters
      const { id } = req.params;
  
      // Find the product by ID in the database
      const product = await AddProDuctModel.findById(id);
  
      // Check if the product exists
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Return the product as JSON response
      res.status(200).json(product);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  };
  module.exports.updateProduct = async (req, res) => {
    try {
      // Extract the product ID from the request parameters
      const { id } = req.params;
  
      // Find the product by ID and update it with the request body
      const updatedProduct = await AddProDuctModel.findByIdAndUpdate(id, req.body, { new: true });
  
      // Check if the product exists
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Return the updated product as JSON response
      res.status(200).json(updatedProduct);
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ error: 'Failed to update product' });
    }
  };
  
  // Delete Product
  module.exports.deleteProduct = async (req, res) => {
    try {
      // Extract the product ID from the request parameters
      const { id } = req.params;
  
      // Find the product by ID and delete it
      const deletedProduct = await AddProDuctModel.findByIdAndDelete(id);
  
      // Check if the product exists
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Return a success message
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      // If an error occurs, return an error response
      res.status(500).json({ error: 'Failed to delete product' });
    }
  };
  
  