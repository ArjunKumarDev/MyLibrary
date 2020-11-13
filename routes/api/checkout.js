const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const Cart = require("../../models/Cart");
const Order = require("../../models/Order");
const { uuid } = require('uuidv4');
const auth = require("../../middleware/auth");
const config = require("config");

const stripe = Stripe(config.get("STRIPE_SECRET_KEY")) 
const calculateCartTotal = require("../../utils/calculateCartTotal");

// Checkout 
router.post("/",auth,async(req,res) => {

    const {paymentData} = req.body;
    const {id} = req.user;

    console.log(paymentData)

    try{
    // Find cart based on userid
    const cart = await Cart.findOne({ user:id }).populate({
        path:"books.book",
        model:"Books"
    })

    console.log("usercart",cart)

     // calculate cart totals
     const{cartTotal,stripeTotal} = calculateCartTotal(cart.books)

      //  Get email for paymentData see if email linked with existing stripe customer
      const prevCustomer = await stripe.customers.list({
        email: paymentData.email,
        limit:1
    })

    console.log("prevCustomer",prevCustomer)

    const isExistingCustomer = prevCustomer.data.length > 0;


    console.log("isexist",isExistingCustomer)

    // if not existing customer create them based on their email
    let newCustomer;
    if(!isExistingCustomer) {
        newCustomer = await stripe.customers.create({
            email:paymentData.email,
            source:paymentData.id
        })
    }

    const customer = (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;

    console.log("customer",customer)

    // Create charge with total,send receipt email
    const charge = await stripe.charges.create({
        currency:"INR",
        amount:stripeTotal,
        receipt_email:paymentData.email,
        customer,
        description: `Checkout | ${paymentData.email} | ${paymentData.id}`
    },{
        idempotency_key:uuid()
    })

    // Add Order to database

    await new Order({
        user: id,
        email:paymentData.email,
        total:cartTotal,
        books:cart.books
    }).save()

    // clear products in cart
    await Cart.findOneAndUpdate(
        {_id: cart._id},
        { $set:{ books:[] } }
    )

    // Send back success
    res.status(200).send("Checkout Successfull")
    }catch(err) {
        res.status(500).json({ msg:err.message })
    }

})

module.exports = router;
