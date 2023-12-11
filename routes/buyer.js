const express = require('express');
const buyerrouter = express.Router();
const User = require('./user.model');
const Catalog = require('./catalog.model');
const Product = require('./product.model');
const Order = require('./order.model');
const auth=require('../middleware/auth')

buyerrouter.get("/api/buyer/list-of-sellers",auth,async (req,res)=>{
    try{
        const {email,password}=req.body
  
        const user=User.find({userType: 'seller'});
        
        res.status(200).json(sellers);
       
      }
      catch(e){
        
          res.status(500).json({error:e.message});
      }
})
buyerrouter.get("/api/buyer/seller-catalog/:seller_id",auth,async (req,res)=>{
    try{
        
  
        const catalog=Catalog.findone({seller:req.params.seller_id}).populate('products');
        
        res.status(200).json(catalog);
       
      }
      catch(e){
        
          res.status(500).json({error:e.message});
      }
})
// /api/buyer/create-order/:seller_id

buyerrouter.post("/api/buyer/create-order/:seller_id",auth,async(req,res)=>{
    try{
   const {products}=req.body
   buyerid=req.user
   sellerid=req.params.seller_id
   const newOrder=new Order({buyer:buyerid,seller:sellerid,products})
   newOrder.save()
   res.status(200).json(newOrder);
    }catch(e){
        res.status(500).json({error:e.message});
    }

})

