const reviewmodel = require('../Models/ReviewModel')
const validator = require('../utils/utils')
const bookmodel = require('../Models/BooksModel')



const addreview = async function(req,res){
 try{
    let params = req.params
    let bookId = params.bookId

    let data = req.body

    if(!validator.isValidRequestBody(bookId)){
        return res.status(400).send({status:false, message:`${bookId} is not valid bookid or not present`})
    }

    let book = await bookmodel.findOne({_id:bookId, isDeleted:true})
    if(book) {return res.status(400).send('book already deleted')}

    if(!book){
        return res.status(400).send({status:false, message:'book not found'})
    }
   
    let {review,rating,reviewedBy} = data

    if(!validator.isValid(review)){return res.status(400).send('please provide valid review')}

    if(!(rating == 1 || review == 2 || review == 3 || review == 4)){
        res.status(400).send('please provide rating 1 to 5')
    }

    let createreviewdata ={
        bookId:bookId,
        reviewedBy:reviewedBy,
        review:review,
        rating:rating,
        reviewedAt:new Date()
    }

    let reviewdata = await reviewmodel.create(createreviewdata)
    await bookmodel.findOneAndUpdate({_id:bookId,isDeleted:false},{$inc:{reviews:1}})

    let newdata = await reviewmodel.find(reviewdata).select({deletedAt:0,isDeleted:0,updatedAt:0,createdAt:0, _v:0})

    return res.status(200).send({status:true, data:newdata})

}catch(error){
    return res.status(400).send(error.message)
}
}

module.exports.addreview = addreview