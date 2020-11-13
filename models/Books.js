const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema.Types;

const bookSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"User"
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    cover:{
        type:String,
        required:true
    },
    totalPage:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    publishDate:{
        type:Date,
        required:true
    },
    reviews:[
        {
            user:{
                type:ObjectId,
                ref:"User"
            },
            text:{
                type:String,
                required:true
            },
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = Books = mongoose.model("Books",bookSchema);