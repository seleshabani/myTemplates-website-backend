const express = require('express');
const itemRouter = express.Router();
const {item} = require('../../model/item')

itemRouter.get('/',async (req,res)=>{
    const items = await item.find()
    // res.set('Access-Control-Allow-Origin','http://localhost:3000');
    res.append('Access-Control-Allow-Origin','http://localhost:3000').status(200).json(items);
})

itemRouter.get('/:id',async (req,res)=>{
    let itemO = await item.findOne({_id:req.params.id});
    res.append('Access-Control-Allow-Origin','http://localhost:3000').status(200).json(itemO);
})
module.exports = itemRouter;