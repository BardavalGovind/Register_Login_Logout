const jwt = require('jsonwebtoken')
const BlackListedTokens = require("../models/blacklistedtoken");

const verifyToken = async (req, res, next)=>{

    const token = req.headers['authorization']
    const isTokenBlacklisted = await BlackListedTokens.findOne({token})
    if(isTokenBlacklisted){
        return res.status(400).send({msg: `Invalid token Access/Access denied`})
    }
    try{
        if(!token){
            res.status(400).send({msg: `No authorization token available./access denied`})
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.userId = decode.userId
        req.token = token
        next()
    }
    catch(err){
        return res.status(403).send({msg: `UnAuthorized Access ${err.message}`})
    }
}
module.exports = verifyToken
