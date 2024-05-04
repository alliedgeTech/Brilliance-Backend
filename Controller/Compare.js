// comparisonController.js
const Comparison = require('../Model/CompareModel');

exports.addToComparison = async (req, res) => {
  try {
    const { ProductData } = req.body;

    // Check if the item is already in the comparison
    const existingItem = await Comparison.findOne({ diamond: ProductData });

    if (existingItem) {
      return res.status(400).json({ success: false, message: 'Item already exists in the Comparison' });
    }

    const comparisonItem = new Comparison({
      diamond: ProductData
    });

    await comparisonItem.save();

    res.status(201).json({ success: true, message: 'Item added to the Comparison' });
  } catch (error) {
    console.error('Error adding item to Comparison:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getComparison = async (req, res) => {
    try {
     
    
  
             // Get recently viewed diamonds for the client (based on IP address)
      const recentlyViewed = await Comparison.find({})
        .populate('diamond')

  
      res.status(200).json({ success: true, data: recentlyViewed });
    } catch (error) {
      console.error('Error fetching recently viewed diamonds:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  