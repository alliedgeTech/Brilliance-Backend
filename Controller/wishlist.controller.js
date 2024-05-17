const WishlistItem = require('../Model/wishlistItem');
const Ring = require("../Model/AddRing")
exports.addToWishlist = async (req, res) => {
  try {
    const { ProductData, RingData } = req.body;

    // Check if the item is already in the wishlist
    const existingItem = await WishlistItem.findOne({ ProductData });
    const existingItem2 = await WishlistItem.findOne({ RingData });
    if (existingItem || existingItem2) {
      return res.status(400).json({ success: false, message: 'Item already exists in the wishlist' });
    }

    const wishlistItem = new WishlistItem({
        ProductData,
        RingData
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
 
  
    
      const wishlistItems = await WishlistItem.find({  }).populate("ProductData").populate("RingData")
  
      res.status(200).json({ success: true, data: wishlistItems });
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  

  exports.deleteWishList = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        const wishlistItem = await WishlistItem.findByIdAndDelete(id);
        if (!wishlistItem) {
            return res.status(404).json({ success: false, error: 'Wishlist item not found' });
        }
        res.status(200).json({ success: true, message: 'Wishlist item deleted successfully' });
    } catch (error) {
        console.error('Error deleting wishlist item by ID:', error);
        res.status(500).json({ success: false, error: 'Error deleting wishlist item' });
    }
}