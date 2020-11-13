const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");



const app = express();


// connect db
connectDB();

// init middleware
// app.use(express.json({ extended:false }))

app.use(bodyParser.json({ limit:"1000mb", extended:true }));

app.use(bodyParser.urlencoded({ limit:"1000mb", extended:true }));

// Define Routes 
app.use("/api/signup",require("./routes/api/signup"));

app.use("/api/auth",require("./routes/api/login"));

app.use("/api/books",require("./routes/api/books"));

app.use("/api/reviews",require("./routes/api/reviews"));

app.use("/api/cart",require("./routes/api/cart"));

app.use("/api/checkout",require("./routes/api/checkout"));

app.use("/api/orders",require("./routes/api/order"));

app.use("/api/users",require("./routes/api/users"));


const PORT = process.env.PORT || 8000;


app.listen(PORT,() => console.log(`Server started on ${PORT}`))