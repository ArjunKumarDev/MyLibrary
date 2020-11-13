const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");

const Books = require("../../models/Books");



// Add Books => POST => api/books 
router.post("/", [auth,[
    check("title","Title is Required").not().isEmpty(),
    check("author","Author name is Required").not().isEmpty(),
    check("description","Description is Required").not().isEmpty(),
    check("publishDate","publishDate is Required").not().isEmpty(),
    check("totalPage","TotalPage is Required").not().isEmpty(),
    check("price","Price is Required").not().isEmpty(),
]],async(req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

 

    const {title,author,description,publishDate,totalPage,price,cover} = req.body;
    const {id} = req.user;

    try {

        const user = await User.findById(id).select("-password");

        const book = await new Books({
            title,
            author,
            description,
            totalPage,
            publishDate, 
            price, 
            cover,
            user:id,
            name:user.name,
            email:user.email
        }).save();


        res.status(201).json(book)
    } catch (err) {
        res.status(500).json({ msg:err.message })
    }
})


// Get all books => GET => api/books
router.get("/",async(req,res) => {
    try{
        const books = await Books.find()
        res.status(200).json(books)
    }catch(err) {
        res.status(500).json({ msg:err.message })
    }
})

// Get book by id => POST => api/books
router.post("/:bookId",auth,async(req,res) => {
    const {bookId} = req.params;

    console.log("param",req.params)

    try {

        if(!mongoose.Types.ObjectId.isValid(bookId)) return res.status(404).json({ msg:"No Book found with that id"})

        const book = await Books.findOne({ _id:bookId })
        res.status(200).json(book)
    } catch (err) {
        res.status(500).json({ msg:err.message })
    }
})

// Update book => PUT => api/books/:id
router.put("/:bookId", [auth,[
    check("title","Title is Required").not().isEmpty(),
    check("author","Author name is Required").not().isEmpty(),
    check("publishDate","publishDate is Required").not().isEmpty(),
    check("totalPage","TotalPage is Required").not().isEmpty(),
    check("price","Price is Required").not().isEmpty(),
]],async(req,res) => { 
        
    
      const errors = validationResult(req);
      

      if(!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
      }

      const {title,author,description,publishDate,totalPage,price} = req.body;
      const {id} = req.user;
      const {bookId} = req.params;

      const user = await User.findById(id).select("-password");

      if(!mongoose.Types.ObjectId.isValid(bookId)) return res.status(404).json({ msg:"No Book found with that id"})

    //   let updatedBooks = await Books.findOne({_id : bookId})

      


      let updatedBooks = {}

 

      updatedBooks.user = id;
      updatedBooks.name = user.name;
      updatedBooks.email = user.email;
      updatedBooks.title = title;
      updatedBooks.author = author;
      updatedBooks.description = description;
      updatedBooks.publishDate = publishDate;
      updatedBooks.totalPage = totalPage;
      updatedBooks.price = price;


      try {
       

         let bookExists = await Books.findOne({ _id:bookId })
        
         if(bookExists) {
            bookExists = await Books.findOneAndUpdate(
                {_id: bookExists._id},
                {$set:updatedBooks},
                {new:true}
            )

            // await bookExists.save()
         }
      
          
            return res.json(bookExists)
        


      } catch (error) {
          res.status(500).json({ msg:error.message })
      }

     
})

// Delete a book => Delete => api/books/:id
router.delete("/:bookId",auth,async(req,res) => {
    const {bookId} = req.params;

    try {

    if(!mongoose.Types.ObjectId.isValid(bookId)) return res.status(404).json({ msg:"No Book found with that id"})

    if(await Books.findOneAndDelete({ _id:bookId })) return res.json({ msg:"Book deleted successfully"})
      
       
    return res.status(404).json({ msg:"No Book found with that id"})

    } catch (err) {
        res.status(500).json({ msg:err.message })
    }
})

module.exports = router;