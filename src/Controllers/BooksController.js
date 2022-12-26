const bookModel = require('../Models/BooksModel')
const userModel = require('../Models/UserModel')
const validator = require('../utils/utils')
const reviewmodel = require('../Models/ReviewModel')
const { isValidObjectId } = require('mongoose')
const { response } = require('express')


let createBooks = async function(req,res){
try{
 let data = req.body

 //jandling edge cases

 if(!validator.isValidRequestBody(data)){
    return res.status(400).send({status:false, msg:"please provide some deatils in the req.body"})
 }

 let {title,excerpt,userId,ISBN,category,subcategory,reviews,} = data
 
if((req.userId !== userId)){
    return res.status(401).send({status:false, message:'user is not authorized'})
}

if(!validator.isValid(title)){
    return res.status(400).send({status:false, message:'please provide title'})
}

if(!validator.isValid(excerpt)){
    return res.status(400).send({status:'false', msg:"please provide valid excerpt"})
}

if(!validator.isValid(userId)){
    return res.status(400).send({status:false, msg:"please provide valid userId"})
}

if(!validator.isValid(ISBN)){
    return res.status(400).send({status:false, msg:"please provide valid Isbn"})
}

if(!validator.isValid(category)){
 return res.status(400).send({status:false, msg:'please provide category'})
}

if(!validator.isValid(subcategory)){
    return res.status(400).send({status:false, msg:'please provide subcategory'})
}

let checkTitle = await bookModel.findOne({title:data.title})

if(checkTitle){
    return res.status(400).send({status:false, message:'title is already exist'})
}

let checkISBN = await bookModel.findOne({ISBN:data.ISBN})

if(checkISBN){
    return res.status(400).send({status:false, msg:"isbn already exist"})
}

let checkUserId = await userModel.findById({_id:data.userId})
console.log(checkUserId)

if(!checkUserId){
    return res.status(400).send({status:false, msg:'userid not found'})
}


let saveddata = await bookModel.create(data)
return res.status(200).send({msg:"successfully created book data", data:saveddata})
}catch(error){
    console.log(error.message)
}
}

module.exports.createBooks = createBooks


const getBooks = async function(req,res){
   try{
    let filterQuery = {isDeleted:false}
    let queryparams = req.query

    if(validator.isValidRequestBody(filterQuery)){
        let {userId,category,subcategory} = queryparams


        if(validator.isValid(userId) && validator.isValidObjectId(userId)){
            filterQuery['userId'] = userId
        }

        if(validator.isValid(category)){
            category['category'] = category.trim()
        }

        if(validator.isValid(subcategory)){
            filterQuery['subcategory'] = subcategory
        }
    }

    let books = await bookModel.find(queryparams).sort({title:1}).select({_id:1, title:1, excerpt:1,userId:1,category:1,subcategory:1,releasedAt:1, reviews:1})

    if(Array.isArray(books) && books.length === 0){
        return res.status(404).send({status:false, message:"no books found"})
    }

    return res.status(200).send({status:true, message:'success', data:books})
}catch(error){
   return res.status(500).send({status:false, message:'no books found'})
}
}

module.exports.getBooks = getBooks


const getbookById = async function(req,res){
    try{
    const bookId = req.params.bookId
    if(!isValidObjectId(bookId)){
        return res.status(400).send({status:false, message:'please provide valid bookid'})
    }

    const bookData = await bookModel.findOne({_id:bookId,isDeleted:false}).select({ISBN:0, _v:0})
    if(!bookData){return res.status(400).send({status:false, message:'no books found with id'})}

    const reviewData = await reviewmodel.find({bookId:bookId, isDeleted:false}).select({isDeleted:0, createdAt:0, updatedAt:0,_v:0})
    bookData.reviewData = reviewData

    return res.status(200).send({status:true, message:'book list', data:bookData})
}catch(error){
    return res.status(500).send({status:false, message:error.message})
}
}


module.exports.getbookById = getbookById


const updateBookById = async function(req,res){
   try{
    const bookId = req.params.bookId
    let data = req.body


    if(!validator.isValidRequestBody(data)){
        return res.status(400).send({status:false, message:'please provide valid request body'})
    }

    let {title,excerpt,releasedAt,ISBN} = data

    if(!validator.isValidString(title)){
 return res.status(400).send({status:false, message:'title is not valid title'})
    }

    let checkTitle = await bookModel.findOne({title:data.title})

    if(checkTitle){return res.status(400).send('title is already exist')}

    if(!validator.isValidString(excerpt)){
     return res.status(400).send('excerpt should have type string')
    }

    if(!validator.isValidString(releasedAt)){
        return res.status(400).send('releasedAt should have type string')
    }
    
    if(!validator.isValidString(ISBN)){
     return res.status(400).send('isbn should have type string')
    }
    let Isbn = await bookModel.findOne({ISBN:data.ISBN})

    if(Isbn){return res.status(400).send('isbn already exist')}


let existbook = await bookModel.findOne({_id:bookId,isDeleted:false})
if(!existbook) {return res.status(400).send('No book found with id')}

const updatebook = await bookModel.findOneAndUpdate({_id:bookId},{$set:{title:data.title, excerpt:data.excerpt, releasedAt:data.releasedAt, ISBN:data.ISBN}},{new:true})

return res.status(200).send({status:true, message:'updated successfully', data:updatebook})

   }catch(error){
    return res.status(400).send(error.message)
   }

}

module.exports.updateBookById = updateBookById

const deletebookById  = async function(req,res){
    try{
    let bookId = req.params.bookId
    let checkbook = await bookModel.findOne({_id:bookId})
    if(checkbook.isDeleted === true){return res.status(400).send('book is already deleted')}
    if(!checkbook) {return res.status(400).send('book not found')}

    const ddata = await bookModel.findOneAndUpdate({_id:bookId},{$set:{isDeleted:true, deletedAt:new Date()}})
    return res.status(200).send('deleted successfully')

    }catch(error){
        return res.status(400).send({status:false, message:error.message})
    }
}

module.exports.deletebookById = deletebookById



