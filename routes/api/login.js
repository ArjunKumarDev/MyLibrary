const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");



// Get user details => api/auth
router.get("/",auth,async(req,res) => {

    const {id} = req.user;

    try {
        const user = await User.findById(id).select("-password");
        res.json(user)
    } catch (err) {
        res.status(500).json({ msg:err.message })
    }
})

// login
router.post("/",[
    check("email","Please include a valid email").isEmail(),
    check("password","Password required").exists()
],async(req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {email,password} = req.body;

    try {
        let user = await User.findOne({ email });

        // user doesn't exist
        if(!user) {
            return res.status(400).json({ errors:[{msg:"Invalid credentials"}]})
        }

        //user exists
        const isMatch = await bcrypt.compare(password,user.password);

        // password doesn't match
        if(!isMatch) {
            return res.status(400).json({ errors:[{msg:"Invalid password"}]})
        }

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(payload,config.get("jwtsecret"),{ expiresIn:"7d" },(err,token) => {
            if(err) throw err

            res.json({ token })
        })

    } catch (err) {
        res.status(500).json({ msg:err.message })
    }
})

module.exports = router;