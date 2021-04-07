const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({

    itemId:{
        type:String,
        required
    },
    userIp:{
        type:String,
        required:true
    }

})
const likeModele = mongoose.model('like',likeSchema);
module.exports = {likeSchema,likeModele}