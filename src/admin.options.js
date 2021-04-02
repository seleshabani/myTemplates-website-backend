const AdminBro = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');
const bcrypt = require('bcrypt')
const {item } = require('./model/item');
const { user } = require('./model/user');
AdminBro.registerAdapter(AdminBroMongoose)
const options = {
    resources: [item,{
        resource: user,
        options: {
          properties: {
            encryptedPassword: {
              isVisible: false,
            },
            password: {
              type: 'string',
              isVisible: {
                list: false, edit: true, filter: false, show: false,
              },
            },
          },
          actions: {
            new: {
              before: async (request) => {
                if(request.payload.password) {
                  request.payload = {
                    ...request.payload,
                    encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                    password: undefined,
                  }
                }
                return request
              },
            }
          }
        }
      }],
};
module.exports = options;