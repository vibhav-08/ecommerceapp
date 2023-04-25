const mongoose = require("mongoose");

const SellerSchema= mongoose.Schema({
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

const SellerModel = mongoose.model("sellers", SellerSchema);
module.exports = SellerModel;