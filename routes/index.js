//index.js
const express = require('express')
const User = require('../models/user');
const {body, validationResult} = require('express-validator')

const {registerUser, loginUser, logoutUser} = require('../controllers/AuthController')
const router = express.Router()

router.get("/", (req, res)=>{
    res.send("this is home page")
})

router.post("/register",[
    body("username").notEmpty().withMessage("Username should not be blank"),
    body("password").isLength({min:5}).withMessage("password should be of min 5 characters"),
    body("email").isEmail().withMessage("must enter a valid email address")
 ], registerUser);

router.post("/login", loginUser)



module.exports = router