const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const {item } = require('./model/item');
AdminBro.registerAdapter(AdminBroMongoose)
const options = {
    resources: [item],
};
module.exports = options;