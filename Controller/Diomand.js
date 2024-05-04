const DiomandShepa = require("../Model/DiomanDShepa")
const DiamondSchema = require("../Model/DiomandAlldataModel")



exports.createDiomandShape = async (req, res) => {
    try {
        const { category, name } = req.body;
        const images = req.files.map(file => file.filename);
        console.log(category)
        console.log(name)
        console.log(images)
        const product = new DiomandShepa({ category, name, images });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
};

  exports.getDiomandShape = async (req, res) => {
    try {
        const data = await DiomandShepa.find({});
        
        res.status(201).json(data);
    } catch (error) {
        console.error('Error fetching diamond shapes:', error);
        res.status(500).json({ error: 'Failed to fetch diamond shapes' });
    }
};
exports.DeletedDiomandCatogary = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const deletedDiamond = await DiomandShepa.findByIdAndDelete(id);
        if (!deletedDiamond) {
            return res.status(404).json({ success: false, error: 'Diamond not found' });
        }
        res.status(200).json({ success: true, message: 'Diamond deleted successfully' });
    } catch (error) {
        console.error('Error deleting diamond by ID:', error);
        res.status(500).json({ success: false, error: 'Error deleting diamond data' });
    }
};
exports.AddDiomandData =async (req, res) => {
    try {
        // Extract other form fields from req.body
        const {
            shape,
            description,
            size,
            cut,
            clarity,
            price,
            sellPrice,
            stockQuantity
        } = req.body;

       
        const images = req.files.map(file => file.filename);
        console.log(images)

        // Create a new diamond instance
        const newDiamond = new DiamondSchema({
            shape,
            description,
            size,
            cut,
            clarity,
            price,
            sellPrice,
            stockQuantity,
            images
        });

        // Save the new diamond to the database
        await newDiamond.save();

        res.status(201).json({ success: true, message: 'Diamond data added successfully!' });
    } catch (error) {
        console.error('Error adding diamond data:', error);
        res.status(500).json({ success: false, error: 'Error adding diamond data' });
    }
  };


  exports.getAllDiamonds = async (req, res) => {
    try {
       // Pagination
       const page = req.query.page || 1;
       const limit = 10; // Number of diamonds per page
       const skip = (page - 1) * limit;

       // Filter object
       const filter = {};

       // Clarity filter
       if (req.query.clarity) {
          filter.clarity = req.query.clarity;
       }

       // Cut filter
       if (req.query.cut) {
          filter.cut = req.query.cut;
       }

       // Shape filter
       if (req.query.shape) {
          filter.shape = req.query.shape;
       }

       // Price range filter
       if (req.query.price) {
          const priceRange = req.query.price.split('-').map(Number);
          if (priceRange.length === 2 && !isNaN(priceRange[0]) && !isNaN(priceRange[1])) {
             const [minPrice, maxPrice] = priceRange;
             filter.price = { $gte: minPrice, $lte: maxPrice };
          } else {
             return res.status(400).json({ success: false, error: "Invalid price range format" });
          }
       }

       const diamonds = await DiamondSchema.find(filter)
                                          .skip(skip)
                                          .limit(limit);
 
       res.status(200).json({ success: true, data: diamonds });
    } catch (error) {
       console.error("Error fetching diamonds:", error);
       res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};



exports.getDiamondById = async (req, res) => {
    const { id } = req.params;
    try {
        const diamond = await DiamondSchema.findById(id);
        if (!diamond) {
            return res.status(404).json({ success: false, error: 'Diamond not found' });
        }
        res.status(200).json({ success: true, data: diamond });
    } catch (error) {
        console.error('Error fetching diamond by ID:', error);
        res.status(500).json({ success: false, error: 'Error fetching diamond data' });
    }
};

exports.updateDiamondById = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const updatedDiamond = await DiamondSchema.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json({ success: true, data: updatedDiamond });
    } catch (error) {
        console.error('Error updating diamond by ID:', error);
        res.status(500).json({ success: false, error: 'Error updating diamond data' });
    }
};


exports.deleteDiamondById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedDiamond = await DiamondSchema.findByIdAndDelete(id);
        if (!deletedDiamond) {
            return res.status(404).json({ success: false, error: 'Diamond not found' });
        }
        res.status(200).json({ success: true, message: 'Diamond deleted successfully' });
    } catch (error) {
        console.error('Error deleting diamond by ID:', error);
        res.status(500).json({ success: false, error: 'Error deleting diamond data' });
    }
};