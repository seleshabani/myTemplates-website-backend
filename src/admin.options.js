const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const itemOptions = require('./hooks/admin/item.ressource.options')
const userOptions = require('./hooks/admin/user.ressource.options');
const { categorieModel } = require('./model/categorie');

AdminBro.registerAdapter(AdminBroMongoose)
const options = {
    resources: [itemOptions,userOptions,categorieModel],
    branding: {
        companyName: 'MyTemplates-Admin',
    }
};
module.exports = options;