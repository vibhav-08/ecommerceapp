const mongoose = require("mongoose");

const AdvertiserSchema= mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    
},{timestamps:true})

const Model = mongoose.model("advertisers", AdvertiserSchema);
module.exports = Model;