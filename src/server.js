const express = require('express');
require('dotenv').config()
const AdminBro = require('admin-bro');
const options = require('./admin.options');
const buildAdminRouter = require('./router/admin.router');
const mongoose = require('mongoose');
const path = require('path');
const itemRouter = require('./router/api/item.router');
const {logger} = require('./hooks/logger');
const winston = require('winston');
const likeRouter = require('./router/api/like.router');
const app = express();
const PORT = 3500;

const run = async ()=>{

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));
    }

    app.use('/public',express.static(path.join(__dirname,'../public')));
    const admin = new AdminBro(options);
    const router = buildAdminRouter(admin);
    try {
        await mongoose.connect(process.env.db,
            {useNewUrlParser:true,useUnifiedTopology: true},()=>{
                console.log('db connected')
            });
        } catch (error) {
            // console.log(error)
            logger.log('info',error)
        }
    app.use(admin.options.rootPath,router);
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use('/api/items',itemRouter);
    app.use('/api/likes',likeRouter);

    app.listen(PORT,()=>{
        console.log(`server on http://localhost:${PORT}`)
    });
}
module.exports = run;