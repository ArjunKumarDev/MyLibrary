const express = require("express");
const {check,validationResult} = require("express-validator");
const router = express.Router();
const auth = require("../../middleware/auth");
const mongoose = require("mongoose");





// Post review => POST => api/review
router.post("/:bookId",[auth,[
    check("text","Text is required").not().isEmpty()
]],async(req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {bookId} = req.params;
    const {text} = req.body;
    const {id} = req.user;

    try {
         if(!mongoose.Types.ObjectId.isValid(bookId)) return res.status(404).json({ msg:"No Book found with that id"})

         const user = await User.findById(id).select("-password");
         const book = await Books.findById({ _id:bookId })

         const newReview = {
             text,
             name:user.name,
             email:user.email,
             user:id
         }

         book.reviews.unshift(newReview);

         await book.save();
         res.status(201).json(book)
        
    } catch (err) {
        res.status(500).json({ msg:err.message })
    }
})



// Delete review 
router.delete("/:bookId/:reviewId",auth,async(req,res) => {

    const {bookId,reviewId} = req.params;
    const {id} = req.user;

    try {
        // book id validation
        if(!mongoose.Types.ObjectId.isValid(bookId)) return res.status(404).json({ msg:"No Book found with that id"})

        // review id validation
        if(!mongoose.Types.ObjectId.isValid(reviewId)) return res.status(404).json({ msg:"No Review found with that id"})

        const book = await Books.findById({ _id:bookId })

        // pull out review
        const review = book.reviews.find(review => review.id === reviewId)

        if(!review) {
            return res.status(404).json({ msg:"Review does not exist"})
        }

        if(review.user.toString() !== id) {
            return res.status(401).json({ msg:"User not authorized"})
        }

        const removeIndex = book.reviews.map(review => review.user.toString()).indexOf(id);

        book.reviews.splice(removeIndex,1);

        await book.save();

        res.json(book.reviews);

    } catch (err) {
        res.status(500).json({ msg:err.message })
    }


})

module.exports = router;