const express = require('express')
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")
//create user using post: no login and auth require
const JWT_SECRET = "jayesh"

router.post('/createuser', [
    body('name', 'enter valid name').isLength({ min: 3 }),
    body('email', 'enter valid email').isEmail(),
    body('password', 'password must be at least 5 char').isLength({ min: 5 })

], async (req, res) => {
    //if there are errors return bad req and errors
    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with same email  exists already

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success  =false
            return res.status(400).json({success, error: "sorry a user email is already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
       // console.log(mytoken);
        success  =true
        res.json({success, authtoken})
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }
})

// Route 1 : authenticate user credentials using email and password

router.post("/login",[
    body('email', 'enter valid email').isEmail(),
    body('password',"password should not be empty").exists()
],async (req,res)=>{
    const errors = validationResult(req);
   let success=false
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Route 2: get the user from db and check if already exists
    const {email,password} = req.body;
    try{
      let user = await User.findOne({email:email})
      if(!user){
          success  =false
          return res.status(400).json({success,error:"please try to login with correct credentials"});
      }
      const passwordcompare = await bcrypt.compare(password,user.password)
      if(!passwordcompare){
          success=false
        return res.status(400).json({success ,error:"please try to login with correct credentials"});
      }
      const data = {
          user:{
              id: user.id
          }
      }

      const authtoken =  jwt.sign(data,JWT_SECRET)
       success =true
      res.json({success,authtoken})
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("internal server error")
    }

})

//Route 3 get logged in user details /getuser login required
router.get("/getuser",fetchuser, async (req,res)=>{
    try {
       const userId = req.user.id;
       const user = await User.findById({_id :userId}).select("-password")
       //console.log("user")
       res.json(user)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error")
    }

})


module.exports = router