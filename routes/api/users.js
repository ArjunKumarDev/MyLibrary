const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// Get all users
router.get("/",auth,async(req,res) => {
    const {id} = req.user;

    try{
        const users = await User.find({ _id:{$ne:id} })
        return res.status(200).json(users)
    }catch(err) {
        res.status(500).json({ msg:err.message })
    }
})

// update user role
router.put("/",auth,async(req,res) => {
    const {_id,role} = req.body;

    try {
        await User.findOneAndUpdate(
            {_id},
            {role}
        )
        res.status(200).send("User role updated successfully")
    } catch (err) {
        res.status(500).json({ msg:err.message })
    }
})

module.exports = router;