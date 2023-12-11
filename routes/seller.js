const express = require('express');
const sellerrouter = express.Router();
const Catalog=require('../models/catlog')
const Order=require('../models/order')
const auth=require('../middleware/auth')
sellerrouter.post("/api/seller/create-catalog",auth,async (req,res)=>{
    try{
    const {products}=req.body
    sellerid=req.user
     // Check if the seller's catalog already exists
     const existingCatalog = await Catalog.findOne({ seller: sellerid });

     if (existingCatalog) {
       // If the catalog exists, add new products to the existing list
       existingCatalog.products.push(...products); // Assuming products is an array of product IDs
       await existingCatalog.save();
       return res.status(200).json(existingCatalog);
     } else {
       // If the catalog doesn't exist, create a new catalog and add products
       const newCatalog = new Catalog({ seller: sellerid, products });
       await newCatalog.save();
       return res.status(201).json(newCatalog);
     }
    }
    catch(e){
        res.status(500).json({error:e.message});
    }
})


sellerrouter.get('/api/seller/orders',auth, async (req, res) => {
    try {
      const sellerid = req.user; // Assuming user is authenticated and seller ID is available
      const orders = await Order.find({ seller: sellerid});
      res.status(200).json(orders);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });