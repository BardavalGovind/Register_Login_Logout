const express = require('express')
const User = require('../models/user')
const {body, validationResult} = require('express-validator')

const BlackListedTokens = require("../models/blacklistedtoken")
const jwt = require('jsonwebtoken');


const registerUser = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors:errors.array() });
    }

    const {username, password, mobile} = req.body
    try{
         let user = await User.findOne({username})
         if(user){
             res.status(400).json({msg:"User already exist in the database"})
         }
         user = new User({username, password, mobile})
         await user.save();
         res.status(201).json({msg: "User has been registered successully..."})
    }
    catch(err){
         res.status(500).json({err:`${err.message}`})
    }
 }


const loginUser = async (req, res)=>{
    const {username, password} = req.body
    try{
        let user = await User.findOne({username})

        if(!user){
            return res.status(401).send({msg:'User does not exist in the database'})
        }
        const isMatch=user.verifyPassword(password)
        if(!isMatch){
            return res.status(401).send({msg: `Invalid credentials`})
        }

        /************Token generation code starts here ***** */
        const payload = {userId:user._id}
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '1h'}) //expiresIn is optional

        /************ token generation code ends here ******/
        return res.status(200).send({msg:`Login successful with token ID:${token}`})
    }
    catch(err){
        res.status(500).send({msg:`Error: ${err.message}`})
    }
} 

//logout part of the app

const logoutUser = async (req, res)=>{
    try{
    const token = req.token;
    if(!token){
        return res.status(400).send({msg: `token does not exist`})
    }
    const blackToken = new BlackListedTokens({token})
    await blackToken.save();
    return res.status(200).send({msg: `User has been logout successfully.`})
}
catch(err){
    return res.status(500).send({msg: `Error: ${err.message}`})
}
}


module.exports = {registerUser, loginUser, logoutUser}