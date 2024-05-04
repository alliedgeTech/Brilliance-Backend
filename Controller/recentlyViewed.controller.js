// recentlyViewed.controller.js

const RecentlyViewed = require('../Model/RecentlyView');

// Function to add a recently viewed diamond
exports.addRecentlyViewed = async (req, res) => {
  try {
    const { diamond } = req.body;
   
   

    // Check if the diamond is already viewed by the user
    const existingView = await RecentlyViewed.findOne({  diamond: diamond });

    if (existingView) {
      // If already exists, update the viewedAt timestamp
      existingView.viewedAt = Date.now();
      await existingView.save();
    } else {
      // If not, create a new entry
      await RecentlyViewed.create({  diamond: diamond });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error adding recently viewed diamond:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Function to get recently viewed diamonds for a user
exports.getRecentlyViewed = async (req, res) => {
    try {
     
    
  
      // Get recently viewed diamonds for the client (based on IP address)
      const recentlyViewed = await RecentlyViewed.find({  })
        .populate('diamond')
        .sort({ viewedAt: -1 })
        .limit(5); // Limiting to 5 recently viewed diamonds
  
      res.status(200).json({ success: true, data: recentlyViewed });
    } catch (error) {
      console.error('Error fetching recently viewed diamonds:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  