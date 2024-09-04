//user.js file

const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const saltRounds = 10;
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 32,
    },
    mobile: {
        type: Number,
        required: true,
        min: 10,
    },
});

userSchema.pre("save", async function(next){
  /*
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        this.password = hash;
    });  */
    const salt = await bcrypt.genSalt(saltRounds)
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

userSchema.methods.verifyPassword = function(password){
    return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema);