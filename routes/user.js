//user.js
const express = require('express')


const router = express.Router()
const verifyToken = require("../middleware/authMiddleware")
const User = require("../models/user")
const {logoutUser} = require('../controllers/AuthController')

router.get("/profile", verifyToken, async (req, res)=>{
    const user = await User.findById(req.userId)
    res.send(`this is profile page for the user ${user}`)
})
router.post("/logout", verifyToken, logoutUser)

module.exports = router



