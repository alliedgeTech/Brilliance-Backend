    const DiamondSchema = require("../Model/DiomandAlldataModel");

  module.exports.getDataFiltering = async (req, res) => {
    try {
        // Extract query parameters from the request
        const { price, clarity, cut } = req.query;

        console.log("Filters:", { price, clarity, cut });

        // Check if any filter parameters are provided
        if (!price && !clarity && !cut) {
            // If no filters provided, fetch all diamonds
            const diamonds = await DiamondSchema.find({});
            return res.json(diamonds); // Respond with all diamonds
        }

        // Build a filter object based on the provided query parameters
        const filter = {};

        if (price) {
            // Assuming price is provided as a range like "min-max"
            const [minPrice, maxPrice] = price.split('-');
            filter.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
        }

        if (clarity) {
            filter.clarity = clarity;
        }

        if (cut) {
            filter.cut = cut;
        }

        console.log("Filter:", filter);

        // Query the database with the constructed filter
        const diamonds = await DiamondSchema.find(filter);

        res.json(diamonds); // Respond with the filtered diamonds
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

    
