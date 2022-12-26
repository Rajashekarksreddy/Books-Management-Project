const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

const reviewBooks = new mongoose.Schema({
    bookId:{
        type:objectId,
        type:String,
        required:true,
        ref:'Books'
    },

    reviewedBy:{
        type:String,
        required:true,
        value:'shekar',
        default:'Guest'
    },

    rating :{
        type:Number,
        min:1,
        max:5,
        required:true
    },

    review:{
        type:String,
    },
    isDeleted:{
        type:Boolean,
        default:false

    },
    reviewedAt: {
        type:Date,
        require:true
    }
})

module.exports = mongoose.model('review', reviewBooks)