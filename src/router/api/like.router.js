require('dotenv').config();
const express = require('express');
const likeRouter = express.Router();
const { logger_log } = require('../../hooks/logger');
const { item } = require('../../model/item');
const { likeModele } = require('../../model/like');


likeRouter.post('/', async (req, res) => {

    try {
        const itemId = req.body.itemId;
        const userIp = req.ip;
        let like = await likeModele.findOne({itemId:itemId,userIp:userIp});
        if(!like){
            like = new likeModele({itemId: itemId, userIp: userIp });
            like = await like.save();
            res.append(process.env.cors_header, process.env.authorized_cors_url).status(201).json(like);
        }else{
            res.append(process.env.cors_header, process.env.authorized_cors_url).status(500).json('le même utilisateur ne peut pas liker le même post 2 fois');
        }
    } catch (error) {
        logger_log('/', error)
        res.append(process.env.cors_header, process.env.authorized_cors_url).status(500).json("erreur interne du serveur");
    }
})

likeRouter.get('/post/:id', async (req, res) => {
    try {
        const likes = await likeModele.find({ itemId: req.params.id });
        res.append(process.env.cors_header, process.env.authorized_cors_url).status(200).json(likes);
    } catch (error) {
        logger_log('/post/:id', error);
        res.append(process.env.cors_header, process.env.authorized_cors_url).status(500).json("erreur interne du serveur");
    }
})

//supression

likeRouter.get('/:id', async (req, res) => {
    try {
        const itemId  = req.params.id;
        const userIp = req.ip;
        const like = await likeModele.findOneAndDelete({ itemId: itemId, userIp: userIp });
        res.append(process.env.cors_header, process.env.authorized_cors_url).status(200).json('deleted');
    } catch (error) {
        logger_log('delete /', error)
        res.append(process.env.cors_header, process.env.authorized_cors_url).status(500).json("erreur interne du serveur");
    }
})

likeRouter.get('/:itemId/isliked',async (req,res)=>{
    try {
        let userIp = req.ip;
        let itemId = req.params.itemId;
        let itemO = await item.findOne({_id:itemId});
        let like = null;
        if (itemO) {
            like = await likeModele.findOne({itemId:itemId,userIp:userIp});
            if (!like) {
                res.append(process.env.cors_header, process.env.authorized_cors_url).status(200).json(false);
            }else{
                res.append(process.env.cors_header, process.env.authorized_cors_url).status(200).json(true);
            }
        }else{
            res.append(process.env.cors_header, process.env.authorized_cors_url).status(500).json('erreur du serveur');
        }
    } catch (error) {
        console.log(error)
        logger_log('/:itemId/isliked',error);
    }
})


module.exports = likeRouter;