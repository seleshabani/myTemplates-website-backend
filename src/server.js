const express = require('express');
require('dotenv').config()
const AdminBro = require('admin-bro');
const options = require('./admin.options');
const buildAdminRouter = require('./router/admin.router');
const mongoose = require('mongoose');
const path = require('path');
const itemRouter = require('./router/api/item.router');
const logger = require('./hooks/logger');
const winston = require('winston');
const app = express();
const PORT = 3500;

const run = async ()=>{

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
        }));
    }

    app.use('/public',express.static(path.join(__dirname,'../public')));
    app.use(express.json());
    const admin = new AdminBro(options);
    const router = buildAdminRouter(admin);
    // app.use(express.urlencoded({extended:false}));
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
    app.use('/api/items',itemRouter);

    // app.use()
    app.listen(PORT,()=>{
        console.log(`server on http://localhost:${PORT}`)
    });
}
module.exports = run;