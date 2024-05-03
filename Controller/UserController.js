const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const JWT_SECRET = process.env.JWT_SECRET || "asaxsac"; // Use environment variable or fallback

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        msg: "Bad request. Please add email and password in the request body",
      });
    }

    // Find user by email
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(422).json({ error: "Invalid Email or password" });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: foundUser._id, name: foundUser.name },
      JWT_SECRET,
      { expiresIn: "30d" }
    );
     

    // Return user data and token
    const { _id, email: userEmail, isAdmin } = foundUser;
    res.status(200).json({
      msg: "User logged in",
      token,
      user: { _id, email: userEmail, isAdmin }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};



const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

const getAllUsers = async (req, res) => {
  try {
    let users = await User.find({}).select("-password");
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};
const transporter1 = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harshxyz5@gmail.com',
    pass: 'lxmh azbz zunm nnyt'
  }
});
const register = async (req, res) => {
  console.log('Session data before setting OTP:', req.session);
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please provide both email and password" });
  }

  // Generate OTP
  const OTP = Math.floor(100000 + Math.random() * 900000);
  req.session.OTP = OTP;
  console.log('Session data after setting OTP:', req.session);

  const mailOptions = {
    from: 'harshxyz5@gmail.com',
    to: req.body.email,
    subject: 'OTP for Registration',
    text: `Your OTP for registration is: ${OTP}`
  };

  try {
    await transporter1.sendMail(mailOptions);
    console.log('Email sent');

    req.session.email = email;
    req.session.password = password;

    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send OTP' });
  }
};

const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  console.log('Session data in verifyOTP:', req.session);
  console.log('Stored OTP:', req.session.OTP);
  console.log('Provided OTP:', otp);

  if (otp && req.session.OTP && otp === req.session.OTP.toString()) {
    const { email, password } = req.session;

    try {
      const hashedPassword = await bcrypt.hash(password, 12);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(422).json({ error: "User already exists with that email" });
      }

      const newUser = new User({ email, password: hashedPassword });
      await newUser.save();

      delete req.session.OTP;

      return res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(400).json({ error: 'Invalid OTP' });
  }
};




const forgetPass = async (req, res) => { 
  const { email } = req.body;
  
  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const otp = generateOTP();
      user.resetPasswordOTP = otp;
      await user.save();

      // Send email with OTP
      const mailOptions = {
          from: 'harshxyz5@gmail.com',
          to: email,
          subject: 'Password Reset OTP',
          text: `Your OTP to reset password is: ${otp}`
      };

      transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
              console.log(error);
              return res.status(500).json({ message: 'Failed to send OTP' });
          } else {
              console.log('Email sent: ' + info.response);
              return res.status(200).json({ message: 'OTP sent successfully' });
          }
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
  }
}


const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'harshxyz5@gmail.com',
    pass: 'lxmh azbz zunm nnyt'
  }
});

const otpVerify = async(req, res) => {
  const { otp } = req.body;

  try {
    // Find user by OTP
    const user = await User.findOne({ otp });
    if (!user) {
      return res.status(404).json({ message: 'Invalid OTP' });
    }

    // Clear OTP from user document in the database
    user.otp = undefined;
    await user.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
}
const resetpassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body;
    console.log(req.body)
    
    // Find the user by OTP
    const user = await User.findOne({ resetPasswordOTP: otp });
    
    if (!user) {
      return res.status(400).json({ code: 400, message: "Invalid OTP" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password with the hashed password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ code: 200, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: "Internal server error" });
  }
};




module.exports = {
  login,
  register,
  dashboard,
  getAllUsers,
  forgetPass,
  resetpassword,verifyOTP
};
