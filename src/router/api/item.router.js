require('dotenv').config();
const express = require('express');
const logger = require('../../hooks/logger');
const itemRouter = express.Router();
const {item} = require('../../model/item')

itemRouter.get('/',async (req,res)=>{
    try {
        const items = await item.find()
        res.append(process.env.cors_header,process.env.authorized_cors_url).status(200).json(items);
    } catch (error) {
        console.log(error)
        logger.log('info',error)
    }
})

itemRouter.get('/:id',async (req,res)=>{
    try {
        const itemO = await item.findOne({_id:req.params.id});
        res.append(process.env.cors_header,process.env.authorized_cors_url).status(200).json(itemO);
    } catch (error) {
        console.log(error)
        logger.log('info',error)
    }
})

itemRouter.get('/search/:q',async (req,res)=>{
    try {
        const items = await item.find({name:{$regex:new RegExp(req.params.q)}});
        res.append(process.env.cors_header,process.env.authorized_cors_url).status(200).json(items);
    } catch (error) {
        console.log(error);
        logger.log('info',error)
    }
})
module.exports = itemRouter;