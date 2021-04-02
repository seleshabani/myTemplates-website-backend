const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    encryptedPassword:{
        type:String,
        required:true
    },
    role:{ type: String, enum: ['admin', 'restricted'], required: true }
});
const user = mongoose.model('user',userSchema);

module.exports = {user,userSchema};