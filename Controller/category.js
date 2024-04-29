

const Category = require('../Model/categorySchema'); 




module.exports.AddCotogary = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({name});
    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// // Route to get all categories
module.exports.getCatogary = async (req, res) => {
  try {
    const categories = await Category.find();
     res.json(categories);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
}

// // Route to update a category by ID
// router.put('/categories/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name } = req.body;
//     const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
//     res.json(updatedCategory);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Route to delete a category by ID
module.exports.deleteProduct= async (req, res) => {
  try {
    const { id } = req.params;
     await Category.findByIdAndDelete(id);
     res.json({ message: 'Category deleted successfully' });
   } catch (error) {
     res.status(500).json({ error: error.message });
  }
}


