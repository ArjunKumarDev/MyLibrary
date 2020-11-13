const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"User"
    },
    books:[
        {
            quantity:{
                type:Number,
                required:true
            },
            book:{
                type:ObjectId,
                ref:"Books"
            }
        }
    ],
    email:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }


})


module.exports = Order = mongoose.model("Order",OrderSchema);