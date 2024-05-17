const Ring = require("../Model/AddRing")
const RingCategory = require("../Model/RingCategory")
const mongoose = require('mongoose');

module.exports.AddProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            sellPrice,
            stockQuantity,catogary
        } = req.body;

        // Extract arrays for sizes and colors
        const sizes = req.body.sizes;
        const colors = req.body.colors;

        // Retrieve images filenames from req.files
        const images = req.files.map(file => file.filename);

        // Create a new Ring instance
        const newRing = new Ring({

            name,
            description,
            price,
            sellPrice,
            sizes,
            colors,
            images,
            stockQuantity,catogary
        });

        // Save the ring to the database
        await newRing.save();

        // Respond with success message
        res.status(201).json({ success: true, message: 'Ring added successfully', ring: newRing });
    } catch (error) {
        // Handle errors
        console.error('Error adding ring:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};  
  

module.exports.getRing = async (req, res) => {
  const page = req.query.page || 1;
  const limit = 10;
  const skip = (page - 1) * limit;
  const filter = {};

  // Handle price range filtering
  if (req.query.minPrice !== undefined && req.query.maxPrice !== undefined) {
    filter.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice };
  }

  // Handle color filtering
  const colors = req.query.colors ? req.query.colors.split(',') : null;
  if (colors && colors.length > 0) {
    filter.colors = { $in: colors };
  }

  // Handle category filtering
  const categoryNames = req.query.catogary ? req.query.catogary.split(',') : null;
  if (categoryNames && categoryNames.length > 0) {
    const RingCategory = mongoose.model('RingCategory');
    const categoryIds = await RingCategory.find({ name: { $in: categoryNames } }, '_id');
    filter.catogary = { $in: categoryIds.map(category => category._id) };
  }

  try {
    const rings = Object.keys(filter).length === 0
      ? await Ring.find({}).populate('catogary').skip(skip).limit(limit)
      : await Ring.find(filter).populate('catogary').skip(skip).limit(limit);
    res.json(rings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  module.exports.updatedRing = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
      const updatedDiamond = await Ring.findByIdAndUpdate(id, updateData, { new: true });
      res.status(200).json({ success: true, data: updatedDiamond });
  } catch (error) {
      console.error('Error updating Ring by ID:', error);
      res.status(500).json({ success: false, error: 'Error updating Ring data' });
  }
}

module.exports.DeltedRing = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDiamond = await Ring.findByIdAndDelete(id);
        if (!deletedDiamond) {
            return res.status(404).json({ success: false, error: 'Ring not found' });
        }
        res.status(200).json({ success: true, message: 'Ring deleted successfully', data: deletedDiamond });
    } catch (error) {
        console.error('Error deleting Ring by ID:', error);
        res.status(500).json({ success: false, error: 'Error deleting Ring data' });
    }
};
exports.getRingById = async (req, res) => {
    const { id } = req.params;
    try {
        const ring = await Ring.findById(id); // Change variable name to lowercase (ring) to follow conventions
        if (!ring) {
            return res.status(404).json({ success: false, error: 'Ring not found' });
        }
        res.status(200).json({ success: true, data: ring }); // Change variable name to lowercase (ring) to follow conventions
    } catch (error) {
        console.error('Error fetching Ring by ID:', error);
        res.status(500).json({ success: false, error: 'Error fetching Ring data' });
    }
};

module.exports.AddRingCatogary = async (req, res) => {
    try {
      const { name } = req.body;
      
      // Create a new ring category
      const newRingCategory = await RingCategory.create({ name });
      
      // Send a response with the newly created ring category
      res.status(201).json(newRingCategory);
    } catch (error) {
      // Handle errors
      console.error('Error creating ring category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  

exports.getRingCatogary = async (req, res) => {
    try {
        const newRing = await RingCategory.find({}); // Ensure to await the asynchronous operation
        res.json(newRing);
    } catch (error) {
        res.status(500).json({ error: error.message }); // Send error response if there's an issue
    }
};
module.exports.delteRingCatogary = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDiamond = await RingCategory.findByIdAndDelete(id);
        if (!deletedDiamond) {
            return res.status(404).json({ success: false, error: 'RingItem not found' });
        }
        res.status(200).json({ success: true, message: 'RingItem deleted successfully', data: deletedDiamond });
    } catch (error) {
        console.error('Error deleting RingItem by ID:', error);
        res.status(500).json({ success: false, error: 'Error deleting RingItem data' });
    }
};