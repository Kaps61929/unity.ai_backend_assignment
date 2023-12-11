const express = require('express');
const sellerrouter = express.Router();
const Catalog=require('../models/catlog')
const Order=require('../models/order')
const auth=require('../middleware/auth')
const Product=require("../models/product")
sellerrouter.post("/api/seller/create-catalog",auth,async (req,res)=>{
    try{
      const { products } = req.body;
      const sellerId = req.user;
  
      // Check if the seller's catalog already exists
      const existingCatalog = await Catalog.findOne({ seller: sellerId });
  
      if (existingCatalog) {
        // If the catalog exists, create and add new products to the existing list
        const newProducts = await Product.create(products); // Assuming products is an array of product objects
        existingCatalog.products.push(...newProducts.map(product => product._id));
        await existingCatalog.save();
        return res.status(200).json(existingCatalog);
      } else {
        // If the catalog doesn't exist, create a new catalog and add products
        const newProducts = await Product.create(products); // Assuming products is an array of product objects
        const newCatalog = new Catalog({ seller: sellerId, products: newProducts.map(product => product._id) });
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

  module.exports=sellerrouter