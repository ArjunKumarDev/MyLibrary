const mongoose = require("mongoose");

const {ObjectId} = mongoose.Schema.Types;

const CartSchema = new mongoose.Schema({
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
    ]
})


module.exports = Cart = mongoose.model("Cart",CartSchema);