const AdminBro = require('admin-bro');
const express = require('express');
const AdminBroExpress = require('@admin-bro/express')

const buildAdminRouter = (admin)=>{
    const router = AdminBroExpress.buildRouter(admin);
    return router;
}

module.exports = buildAdminRouter;