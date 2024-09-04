const mongoose = require('mongoose')
const blackListTokenSchema = new mongoose.Schema({
    token:String,
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model('BlackListedTokens', blackListTokenSchema)