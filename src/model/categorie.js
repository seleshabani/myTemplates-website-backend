const mongoose = require('mongoose');

const categorieSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    resume:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const categorieModel = mongoose.model('categorie',categorieSchema);
module.exports = {categorieSchema,categorieModel}