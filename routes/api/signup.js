const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const Cart = require("../../models/Cart");
const {check,validationResult} = require("express-validator");

const User = require("../../models/User");

// Signup

router.post("/",[
    check('name',"Name is required").not().isEmpty(),
    check('email',"Please include a valid email").isEmail(),
    check('password',"Please enter a password with 6 or more characters").isLength({ min:6 })
],async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors:errors.array() })
    }

    const {name,email,password} = req.body;

    try {
        let user = await User.findOne({email})

      

        if(user) {
            return res.status(400).json({ errors:[{ msg: "User already exist"} ] })
        }

        user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password,salt);

        await user.save();

        const payload = {
            user:{
                id:user.id
            }
        }

        // store userid in cart
       await new Cart({ user:user.id}).save();

        jwt.sign(payload,config.get('jwtsecret'),{expiresIn: "7d" },(err,token) => {
            if(err) throw err;

            res.json({ token })
        })
        
    } catch (err) {
        console.error(err)
        res.status(500).json({ msg:err.message })
    }
})


module.exports = router;