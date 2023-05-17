const asyncHandler = require('express-async-handler');
const User = require("../models/userModel");
const bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken");
//@describe  registr the user 
//@route Post /api/users/register
//@access public
const registerUser = asyncHandler(async(req ,res) => {
   const {username ,email, password} =req.body;
   if(!username|| !email || !password){
    res.status(400);
    throw new Error ('all field are composary')
   }
   const  userAvailable =await User.findOne({email});
   if(userAvailable){
    res.status(400);
    throw new Error ("user already register")
   }
//Hash Password 
const hashedPassword =await bcrypt.hash(password, 10);
console.log("hashed password :", hashedPassword);
const user = await User.create({
    username,
    email,
    password:hashedPassword,
});
console.log(`user created ${user}`);
if(user){
    res.status(201).json({_id:user.id,email:user.email})
}else{
    res.status(400);
    throw new Error(" user data us not valid");
}
    res.json({message :"register the user"});
});



//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("email or password is not valid");
    }
  });
  



 //@describe  currentuser 
//@route Get /api/users/current
//@access pravite
const currentUser = asyncHandler(async(req ,res) => {
    // const contacts= await Contact.find();
     res.json({message :"current user"});
 }); 


module.exports = {registerUser,loginUser , currentUser}