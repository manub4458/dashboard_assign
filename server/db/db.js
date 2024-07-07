const mongoose = require("mongoose");
require('dotenv').config();


const url = process.env.DATABASE_URL;

const db = () => {
    mongoose.connect( url)
    .then(()=>{
        console.log("Mongodb connected");
    }).catch((error)=>{
        console.log("Mongodb connection error", error);
    });
}

module.exports = db;