const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const itemOptions = require('./hooks/admin/item.ressource.options')
const userOptions = require('./hooks/admin/user.ressource.options')

AdminBro.registerAdapter(AdminBroMongoose)
const options = {
    resources: [itemOptions,userOptions],
    branding: {
        companyName: 'MyTemplates-Admin',
    }
};
module.exports = options;