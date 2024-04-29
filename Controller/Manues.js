const mongoose = require("mongoose");

const mainMenuSchema = new mongoose.Schema({
    name: String,
    subMenus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubMenu' }] // Define subMenus field to reference SubMenu model
});

const MainMenu = mongoose.model('MainMenu', mainMenuSchema);

const subMenuSchema = new mongoose.Schema({
    mainMenuId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MainMenu'
    },
    name: String,
});

const SubMenu = mongoose.model('SubMenu', subMenuSchema);

const submanuesMany = new mongoose.Schema({
    subMenuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubMenu', // Assuming you have a MainMenu model
      required: true
    },
    name: {
      type: String,
      required: true
    }
  });
  
  const Submanues = mongoose.model('submanuesMany', submanuesMany);

module.exports.Mainmenu = async (req, res) => {
    try {
        const { name } = req.body;
        const mainMenu = new MainMenu({ name });
        await mainMenu.save();
        res.status(201).json({ message: 'Main menu added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// API endpoint to add a sub-menu to a selected main menu
module.exports.Submenu = async (req, res) => {
    try {
        const { mainMenuId, name } = req.body;
        const subMenu = new SubMenu({ mainMenuId, name });
        await subMenu.save();
        // Push the sub-menu ID to the main menu's subMenus array
        await MainMenu.findByIdAndUpdate(mainMenuId, { $push: { subMenus: subMenu._id } });
        res.status(201).json({ message: 'Sub-menu added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getManues = async (req, res) => {
    try {
        const mainMenus = await MainMenu.find().populate('subMenus'); // Populate subMenus field
        res.json(mainMenus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getSubmanues= async (req,res)=>{
    try{
        const subManu = await SubMenu.find().populate('mainMenuId');
        res.json(subManu);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports.SubmanuesMany = async (req, res) => {
    try {
      const { subMenuId, name } = req.body;
      const submenu = new Submanues({ subMenuId, name });
      await submenu.save();
      res.status(201).json(submenu);
    } catch (error) {
      console.error('Error creating submenu:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };