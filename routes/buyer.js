const express = require('express');
const buyerrouter = express.Router();
const User = require('../models/user');
const Catalog = require('../models/catlog');

const Order = require('../models/order');
const auth=require('../middleware/auth')

buyerrouter.get("/api/buyer/list-of-sellers",auth,async (req,res)=>{
    try{
      
  
        const sellers=await User.find({ userType: 'seller' });
        
        res.status(200).json(sellers);
       
      }
      catch(e){
        
          res.status(500).json({error:e.message});
      }
})
buyerrouter.get("/api/buyer/seller-catalog/:seller_id",auth,async (req,res)=>{
    try{
        
  
        const catalog=await Catalog.findOne({seller:req.params.seller_id}).populate('products');
        
       return  res.status(200).json(catalog);
       
      }
      catch(e){
        
        return   res.status(500).json({error:e.message});
      }
})


buyerrouter.post("/api/buyer/create-order/:seller_id",auth,async(req,res)=>{
    try{
   const {products}=req.body
   const buyerid=req.user
   const sellerid=req.params.seller_id
  
   const newOrder= new Order({buyer:buyerid,seller:sellerid,products})
   await newOrder.save()
   return res.status(200).json(newOrder);
    }catch(e){
       return  res.status(500).json({error:e.message});
    }

})

module.exports=buyerrouter

