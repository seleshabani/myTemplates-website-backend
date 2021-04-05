const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    linkPreview:{
        type:String,
        required:true
    },
    screenPath:{
        type:String,
    },
    screen:{
        type:String,
    },
    screenFile:{
        type:String,
    },
    screenPath:{
        type:String,
    },
    screenBucket:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const item = mongoose.model('Item',itemSchema);
module.exports = {item,itemSchema};