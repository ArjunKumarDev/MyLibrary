const express = require("express");
const router = express.Router();
const Order = require("../../models/Order");
const auth = require("../../middleware/auth");



// Get orders
router.get("/",auth,async(req,res) => {
    const {id} = req.user;

    try {
        const orders = await Order.find({ user:id }).populate({
            path:"books.book",
            model:"Books"
        })
        res.status(200).json(orders)

    } catch (err) {
        res.status(500).json({ msg:err.message })
    }
})

module.exports = router;