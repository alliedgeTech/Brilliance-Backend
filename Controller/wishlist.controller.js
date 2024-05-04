const WishlistItem = require('../Model/wishlistItem');

exports.addToWishlist = async (req, res) => {
  try {
    const { ProductData } = req.body;

    // Check if the item is already in the wishlist
    const existingItem = await WishlistItem.findOne({ ProductData });

    if (existingItem) {
      return res.status(400).json({ success: false, message: 'Item already exists in the wishlist' });
    }

    const wishlistItem = new WishlistItem({
        ProductData
    });

    await wishlistItem.save();

    res.status(201).json({ success: true, message: 'Item added to the wishlist' });
  } catch (error) {
    console.error('Error adding item to wishlist:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Find and remove the item from the wishlist
    await WishlistItem.findOneAndDelete({ productId });

    res.status(200).json({ success: true, message: 'Item removed from the wishlist' });
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getWishlistByUser = async (req, res) => {
    try {
 
  
    
      const wishlistItems = await WishlistItem.find({  }).populate("ProductData");
  
      res.status(200).json({ success: true, data: wishlistItems });
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };