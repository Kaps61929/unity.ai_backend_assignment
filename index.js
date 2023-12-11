const express = require("express");
const mongoose = require("mongoose");

const authRouter=require("./routes/auth")
const sellerrouter=require("./routes/seller")
const buyerrouter=require("./routes/buyer")
// INIT
const PORT = process.env.PORT || 3000;
const DB =
 "mongodb+srv://krishna:mahakaal000@cluster1.tycdjyu.mongodb.net/?retryWrites=true&w=majority"

const app = express(); 
// middleware
app.use(express.json());
app.use(authRouter)
app.use(sellerrouter)
app.use(buyerrouter)

// Connections
mongoose.set("strictQuery", false);
mongoose
  .connect(DB) 
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, () => {
    console.log(`connected at port ${PORT}`);
  });