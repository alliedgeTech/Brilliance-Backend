const mongoose = require('mongoose');
const express = require("express");
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo');

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
app.use(session({
  secret: '123456789',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: "mongodb+srv://harshgadhiya5949:pYuBSrbV5ikBcLZN@cluster0.so6lfn8.mongodb.net/RealTimeDiomand" }),
  cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: false // Set to true if using HTTPS
  }
}));
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
app.use('/api/v1', AddProutect);
app.use('/api/v1', AddCatogary);
app.use('/api/v1', User);
app.use('/api/v1',manues );
app.use('/api/v1',Slider );
app.use("/api/v1",Diomand)
app.use("/api/v1",Filtering)
// Start server
app.listen(6001, () => {
  console.log('Server running on port 6001');
});
