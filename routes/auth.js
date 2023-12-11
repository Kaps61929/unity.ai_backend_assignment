const express = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");

// Register
authRouter.post("/api/auth/register", async (req, res) => {
  try {
    const { username,email,password, userType } = req.body;
    console.log(req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400) 
        .json({ msg: "User with same email already exists!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
    username:username,
      email:email,
      password: hashedPassword,
      userType:userType,
      
    });
    user = await user.save();
    res.json(user);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


//Login
authRouter.post("/api/auth/login",async(req,res)=>{
    try{
      const {email,password}=req.body

      const user=await User.findOne({email:email});
      if(!user){
        return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
      }
      const ismatch= await bcryptjs.compare(password,user.password);

      if(!ismatch){
        return res.status(400).json({ msg: "Incorrect password." });
      }
      const token=jwt.sign({ id: user._id }, "passwordKey");
      res.json({ token, ...user._doc });
    }
    catch(e){
      
        res.status(500).json({error:e.message});
    }
});
module.exports=authRouter