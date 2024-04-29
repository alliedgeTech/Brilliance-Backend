const Slider = require("../Model/Slider")
const multer = require('multer');

// Multer configuration for file upload
const upload = multer({ dest: 'uploads/' });

// POST endpoint for handling form submission
module.exports.AddSlider = upload.array('images'), async (req, res) => {
    try {
      
        const { heading, paragraphText } = req.body;
        
        
        const images = req.files;

   
 
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


