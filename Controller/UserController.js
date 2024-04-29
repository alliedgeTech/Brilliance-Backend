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

const register = async (req, res) => {
  // let foundUser = await User.findOne({ email: req.body.email });
  // if (foundUser === null) {
  //   let { firstName, lastName, email, phoneNumber, password } = req.body; // Corrected variable name
  //   if (firstName && lastName && email && phoneNumber && password) {
  //     const person = new User({
  //       firstName,
  //       lastName,
  //       email,
  //       phoneNumber,
  //       password
  //     });
  //     await person.save();
  //     return res.status(201).json({ person });
  //   } else {
  //       return res.status(400).json({msg: "Please add all values in the request body"});
  //   }
  // } else {
  //   return res.status(400).json({ msg: "Email already in use" });
  // }

let {  email, password } = req.body;
    console.log(req.body)
    if(!email ||  !password )
    {
        return res.status(200).json({error:"Add all data"})
    }
    bcrypt.hash(password,12)
    .then((hashedpw)=>{
        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                 return res.status(422).json({error:"User already exists with that email"})
            }
            const user=new User({
              
              email, 
              
               password:hashedpw
             
         })
         user.save()
         .then((user)=>{
             res.json({message:"Saved Successfully"})
             console.log(user.email)
         })
         .catch((err)=>{
             console.log(err)
         })
    })
    .catch((err)=>{
        console.log(err)
    })   

})
.catch((err)=>{
    console.log(err)
})
}

// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000);
// }

// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//       user: 'harshxyz5@gmail.com',
//       pass: 'lxmh azbz zunm nnyt'
//   }
// });
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

// const resetpassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;


//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     console.log('Saved OTP:', user.resetPasswordOTP); // Check what OTP is saved in the user

//     if (user.resetPasswordOTP !== otp) {
//       console.log('Invalid OTP:', otp);
//       return res.status(400).json({ message: 'Invalid OTP' });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // Update user's password and resetPasswordOTP
//     user.password = hashedPassword;
//     user.resetPasswordOTP = null;

//     // Save the updated user
//     await user.save();

//     return res.status(200).json({ message: 'Password updated successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };
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
// const forgetPass = async (req, res) => {
//   const { email } = req.body;
  
//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const otp = generateOTP();
//     const hashedOTP = await bcrypt.hash(otp.toString(), 10); // Hash the OTP

//     user.resetPasswordOTP = hashedOTP; // Save hashed OTP
//     await user.save();

//     // Send email with OTP
//     const mailOptions = {
//       from: 'harshxyz5@gmail.com',
//       to: email,
//       subject: 'Password Reset OTP',
//       text: `Your OTP to reset password is: ${otp}`
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({ message: 'Failed to send OTP' });
//       } else {
//         console.log('Email sent: ' + info.response);
//         return res.status(200).json({ message: 'OTP sent successfully' });
//       }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// const resetpassword = async (req, res) => {
//  User.find({resetPasswordOTP:req.body.otp}).then(result=>{
//   User.updateOne({email:result.email},{password:req.body.password})
//   .then(result=>{
//     res.seng({code:200,message:"password Updted"})

//   }).catch(error=>{
//     res.send({code:500,message:"server err"})
//   })
//  }).catch(error=>{
//   res.send({code:500,message:"otp wrong "})
// })
// }; 
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
  resetpassword
};
