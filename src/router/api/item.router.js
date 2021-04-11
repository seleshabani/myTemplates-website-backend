require('dotenv').config();
const express = require('express');
const itemRouter = express.Router();
const {logger, logger_log} = require('../../hooks/logger');
const { paginate } = require('../../hooks/midlwares/paginate');
const {item} = require('../../model/item')

itemRouter.get('/',paginate(item),async (req,res)=>{
    try {
      //  const items = await item.find()
        res.append(process.env.cors_header,process.env.authorized_cors_url).status(200).json(res.paginatedResults);
    } catch (error) {
        // logger.log('info',{route:'/',...error})
        logger_log('/',error)
    }
})

itemRouter.get('/:id',async (req,res)=>{
    try {
        const itemO = await item.findOne({_id:req.params.id});
        res.append(process.env.cors_header,process.env.authorized_cors_url).status(200).json(itemO);
    } catch (error) {
        logger.log('info',{route:'/:id',...error})
    }
})

itemRouter.get('/search/:q',paginate(item,true),async (req,res)=>{
    try {
      //  const items = await item.find({name:{$regex:new RegExp(req.params.q)}});
        res.append(process.env.cors_header,process.env.authorized_cors_url).status(200).json(res.paginatedResults);
    } catch (error) {
        logger.log('info',{route:'/search',...error})
    }
})
module.exports = itemRouter;