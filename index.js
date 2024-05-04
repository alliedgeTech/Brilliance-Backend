const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors')


const bodyParser =require('body-parser');
const app = express();
const path = require('path'); 
const env = require("./.env");
require('dotenv').config();

// const mongoURI = "mongodb+srv://harshgadhiya5949:FFB1lEZp3tgTUBdD@cluster0.fdrzyww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
const AddProutect = require('./Routes/AddProduct');
const AddCatogary = require('./Routes/catogary')
const User = require('./Routes/user')
const manues = require('./Routes/manues')
const Slider = require('./Routes/Slider')
const Diomand = require('./Routes/DiomandShepa')
const Filtering = require('./Routes/Filtering')
const RecentlyView = require('./Routes/recentlyViewed.routes')
app.use('/api/v1', AddProutect);
app.use('/api/v1', AddCatogary);
app.use('/api/v1', User);
app.use('/api/v1',manues );
app.use('/api/v1',Slider );
app.use("/api/v1",Diomand)
app.use("/api/v1",Filtering)
app.use("/api/v1",RecentlyView)
// Start server
app.listen(6001, () => {
  console.log('Server running on port 6001');
});
