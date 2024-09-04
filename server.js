//server.js
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')  //package for handling environment variable
// ******* configuring the environment variable for APP
dotenv.config({path: "./config/.env"});

const app = express();
const bodyParser = require('body-parser')
const indexRoutes = require('./routes/index')
const userRoutes = require('./routes/user')
const port = process.env.PORT || 3000;

app.use(bodyParser.json())

// ******************** Connecting with database start here *******************
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(`${process.env.MONGO_URI} Mongodb connected`)
})
.catch((err)=>{
    console.log(err)
})

// ************ Database connection code end here **********

// ********Handling Routes**********
app.use("/", indexRoutes)
app.use("/user", userRoutes)
// *********Handling routes ends here*********

app.listen(port, ()=> console.log(`app listening at port ${port}`));
