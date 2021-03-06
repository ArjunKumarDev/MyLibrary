const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"user",
        enum:["user","admin","root"]
    },
    date:{
        type:Date,
        default:Date.now
    }
})


module.exports = User = mongoose.model("User",UserSchema);