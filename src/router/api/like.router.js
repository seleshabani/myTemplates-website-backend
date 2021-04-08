require('dotenv').config();
const express = require('express');
const logger = require('../../hooks/logger');
const { likeModele } = require('../../model/like');
const likeRouter = express.Router();

likeRouter.post('/',async (req,res)=>{
    const itemId = req.body.itemId;
    const userIp = req.ip;
    let like = new likeModele({itemId:itemId,userIp:userIp});

    try {
        like = await like.save();
        res.append(process.env.cors_header,process.env.authorized_cors_url).status(201).json(like);
    } catch (error) {
        console.log(error);
    }
})

likeRouter.get('/post/:id',async (req,res)=>{
    try {   
        const likes = await likeModele.find({itemId:req.params.id});
        res.append(process.env.cors_header,process.env.authorized_cors_url).status(200).json(likes);
    } catch (error) {
        logger.log('info',error);
    }
})

likeRouter.delete('/',async (req,res)=>{
    const {userIp,itemId} = req.params;
    try {
        const like = await likeModele.findOneAndDelete({itemId:itemId,userIp:userIp});
        res.append(process.env.cors_header,process.env.authorized_cors_url).status(200).json(like);
    } catch (error) {
        logger.log('info',error);
    }
})

module.exports = likeRouter;