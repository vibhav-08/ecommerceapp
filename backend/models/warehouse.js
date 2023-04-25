const mongoose = require("mongoose");

const WarehouseSchema= mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    }
    
},{timestamps:true})

const Model = mongoose.model("warehouses",WarehouseSchema);
module.exports = Model;