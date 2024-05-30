// Controller/Manues.js
const mongoose = require("mongoose");

// Define SubMenu schema and model
const subMenuSchema = new mongoose.Schema({
    mainMenu: {
        type: String,
        enum: ['Diamonds', 'Engagement', 'Wedding', 'eCommerce', 'More Pages'], // Predefined main menu items
        required: true
    },
    name: String,
});

const SubMenu = mongoose.model('SubMenu', subMenuSchema);

// Define SubmanuesMany schema and model
const submanuesManySchema = new mongoose.Schema({
    subMenuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubMenu', // Reference to SubMenu model
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const SubmanuesMany = mongoose.model('SubmanuesMany', submanuesManySchema);

module.exports.Submenu = async (req, res) => {
    try {
        const { mainMenu, name } = req.body;
        if (!['Diamonds', 'Engagement', 'Wedding', 'eCommerce', 'More Pages'].includes(mainMenu)) {
            return res.status(400).json({ message: 'Invalid main menu' });
        }
        const subMenu = new SubMenu({ mainMenu, name });
        await subMenu.save();
        res.status(201).json({ message: 'Sub-menu added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getSubmanues = async (req, res) => {
    try {
        const subMenus = await SubMenu.find().populate('mainMenu');
        res.json(subMenus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.SubmanuesMany = async (req, res) => {
    try {
        const { subMenuId, name } = req.body;
        const submenu = new SubmanuesMany({ subMenuId, name });
        await submenu.save();
        res.status(201).json(submenu);
    } catch (error) {
        console.error('Error creating submenu:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getSubmanuesMany = async (req, res) => {
    try {
        const subManu = await SubmanuesMany.find().populate('subMenuId');
        res.json(subManu);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
