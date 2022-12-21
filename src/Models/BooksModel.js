const mongoose = require('mongoose')

const bookModel = new mongoose.Schema({

    title:{
        type:String,
        require:true,
        unique:true
    },
    excerpt:{
        type:String,
        require:true
    },
    
    userId:{
        type:mongoose.Types.Schema.ObjectId,
        ref:'User'
    },
    ISBN:{
        type:String,
        require:true,
        unique:true
    },
    category:{
        type:String,
        require:true
    },
    subcategory:[{type:String, require:true}],

    reviews:{
     type:Number,
     default:0,
     Comment:String
    },
    deletedAt:Date,
    isDeleted:{
        type:Boolean,
        default:false
    },
    releasedAt:{
        type:Date,
        require:true,
    },
},{timestamps:true})

module.exports = mongoose.model('Book',bookModel)