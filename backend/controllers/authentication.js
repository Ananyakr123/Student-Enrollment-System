
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require('../model/user');
const mongoose=require('mongoos');
const signUp=async(req,res)=>{
    try{
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
              success: false,
              message: "All fields are required",
            });
          }
const existingUser= User.findOne({ email});
if(existingUser){
    return res.status(409).json({
        successs:false,
        message:"email already registered"
    })
}
const hashedPassword = await bcrypt.hash(password,10);
const user =new User({
    name,
    email,
    password: hashedPassword,
})
await User.save();
res.status(201).json({
    success: true,
    message: "Account created successfully",
  });
    }catch(error){
        console.error("Signup error:", error);

        res.status(500).json({
          success: false,
          message: "Server error",
        });
    }
}


const login=async(req, res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                messsage:"all fields are required"
            })
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
              });
        }

        const isPasswordCorrect= await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status().json({
                success:false,
                message:"invalid email or password"
            })
        }
   
            const token = jwt.sign(
                {
                  id: user._id,
                  email: user.email,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: "1d",
                }
              );
        
        res.status(200).json({
            success:true,
            message:"valid credentials",
            token,
           User:{
            id: user._id,
            name: user.name,
            email: user.email
           },
        });
    }catch(error){
        console.error("Login error:", error);

        res.status(500).json({
          success: false,
          message: "Server error",
        });
    }
}

module.exports = {
    signUp,
    login,
  };