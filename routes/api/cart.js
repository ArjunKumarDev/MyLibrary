const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {check,validationResult} = require("express-validator");
const Cart = require("../../models/Cart");


const {ObjectId} = mongoose.Types;

// Get carts
router.get("/",auth,async(req,res) => {
    const {id} = req.user;

    try {
        const cart = await Cart.findOne({ user:id }).populate({
            path:"books.book",
            model:"Books"
        })

        res.status(200).json(cart.books)
    } catch (err) {
        res.status(500).json({ msg:err.message })
    }
})


// Add to cart => PUT => /api/cart
router.put("/",[auth,[
    check("quantity","Quantity is required").not().isEmpty()
]],async(req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    const {quantity,bookId} = req.body;
    const {id} = req.user;
    const BookId = mongoose.Types.ObjectId(bookId);

    console.log("bookidhe","5facb710d9e6bf38885de37f" === bookId)



    try {
        // get user cart based on userid
        const cart = await Cart.findOne({ user:id })

        console.log("cartcheck",cart)
       

      
        // check if a book already exists in cart

       
        const bookExists = cart.books.some(doc => ObjectId(bookId).equals(doc.book))
        

        console.log(bookExists)

        // If so,increment quantity
        if(bookExists) {
            await Cart.findOneAndUpdate(
                {
                    _id:cart._id,
                    "books.book":bookId
                },
                {
                    $inc:{"books.$.book":quantity}
                }
            )
        }else {
            // add new book with given quantity
            const newProduct = {quantity,book:bookId};


            console.log("newprod",newProduct)

            await Cart.findOneAndUpdate(
                {_id:cart._id},
                { $addToSet:{ books:newProduct } }
            )
        }

        res.status(200).send("Cart updated")
        
    } catch (err) {
        res.status(500).json({ msg:err.message })
    }
})

// Delete cart => api/cart/bookId
router.delete("/:bookId",auth,async(req,res) => {
    const {id} = req.user;
    const {bookId} = req.params;

    try {
        const cart = await Cart.findOneAndUpdate(
            {user:id},
            {$pull:{ books:{book:bookId}}},
            {new:true}
        ).populate({
            path:"books.book",
            model:"Books"
        })

        res.status(200).json(cart.books)
    } catch (err) {
        res.status(500).json({ msg:err.message })
    }
})


module.exports = router;