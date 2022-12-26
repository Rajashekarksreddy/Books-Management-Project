const reviewmodel = require('../Models/ReviewModel')
const validator = require('../utils/utils')
const bookmodel = require('../Models/BooksModel')



const addreview = async function(req,res){

    let params = req.params
    let bookId = params.bookId

    if(!validator.isValidRequestBody(bookId)){
        return res.status(400).send({status:false, message:`${bookId} is not valid bookid or not present`})
    }

    let book = await bookmodel.findOne({_id:bookId, isDeleted:true})

    if(!book){
        return res.status(400).send({status:false, message:'book not found'})
    }





}