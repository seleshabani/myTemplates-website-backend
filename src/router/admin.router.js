const AdminBro = require('admin-bro');
const express = require('express');
const AdminBroExpress = require('@admin-bro/express')
const {user} = require('../model/user')
const bcrypt = require('bcrypt')
require('dotenv').config()
// const mongoose = require('mongoose');
// const session = require('express-session');
// const mongoStore = require('connect-mongo');

const buildAdminRouter = (admin)=>{
    // const router = AdminBroExpress.buildRouter(admin);
    const router = AdminBroExpress.buildAuthenticatedRouter(admin, {
        authenticate: async (email, password) => {
          const userObj = await user.findOne({ email })
          if (userObj) {
            const matched = await bcrypt.compare(password, userObj.encryptedPassword)
            if (matched) {
              return userObj
            }
          }
          return false
        },
        cookiePassword: 'some-secret-password-used-to-secure-cookie'
    },null,{
      resave:false,
      saveUninitialized:true,
    })
    return router;
}

module.exports = buildAdminRouter;