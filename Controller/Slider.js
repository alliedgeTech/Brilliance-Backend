const Slider = require("../Model/Slider")
const multer = require('multer');

// Multer configuration for file upload
const upload = multer({ dest: 'uploads/' });

// POST endpoint for handling form submission
module.exports.AddSlider = [
    upload.array('images'),
    async (req, res) => {
      try {
        const { heading, paragraphText } = req.body;
        const images = req.files;
  
        if (!images) {
          return res.status(400).json({ error: 'No files uploaded' });
        }
  
        const newSlider = new Slider({
          heading,
          paragraphText,
          images: images.map(image => image.filename)
        });
        await newSlider.save();
  
        res.status(200).json({ message: 'Slider added successfully' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  ];

module.exports.GetSlide = async (req, res) => {
    try {
        const sliders = await Slider.find();
        res.status(200).json(sliders);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.UpdateSlider = [
    upload.array('images'),
    async (req, res) => {
      try {
        const { id } = req.params;
        const { heading, paragraphText } = req.body;
        const images = req.files;
  
        const slider = await Slider.findById(id);
        if (!slider) {
          return res.status(404).json({ error: 'Slider not found' });
        }
  
        slider.heading = heading || slider.heading;
        slider.paragraphText = paragraphText || slider.paragraphText;
        if (images.length > 0) {
          slider.images = images.map(image => image.filename);
        }
  
        await slider.save();
  
        res.status(200).json({ message: 'Slider updated successfully' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  ];
   
  module.exports.DeleteSlider = async (req, res) => {
  try {
    const { id } = req.params;

    const slider = await Slider.findByIdAndDelete(id);
    if (!slider) {
      return res.status(404).json({ error: 'Slider not found' });
    }

    res.status(200).json({ message: 'Slider deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
