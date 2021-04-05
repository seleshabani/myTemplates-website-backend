const express = require('express');
require('dotenv').config()
const AdminBro = require('admin-bro');
const options = require('./admin.options');
const buildAdminRouter = require('./router/admin.router');
const mongoose = require('mongoose');
const path = require('path')
const app = express();
const PORT = 3000;

const run = async ()=>{
    app.use('/public',express.static(path.join(__dirname,'../public')))
    const admin = new AdminBro(options)
    const router = buildAdminRouter(admin)
    await mongoose.connect(process.env.db,
        {useNewUrlParser:true,useUnifiedTopology: true},()=>{
        console.log('db connected')
    })
    app.use(admin.options.rootPath,router);
    app.listen(PORT,()=>{
        console.log(`server on ${PORT}`)
    })
}
module.exports = run;