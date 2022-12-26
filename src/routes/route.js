const express = require('express')
const userRegister = require('../Controllers/UserController')
const Books = require('../Controllers/BooksController')

let middleware = require('../middleware/middleware')

const router = express.Router()

router.post('/register', userRegister.userRegister)

router.post('/login', userRegister.Login)


//protected routes

router.post('/books',middleware.Authentication, Books.createBooks)

router.get('/books',middleware.Authentication,Books.getBooks )

router.get('/books/:bookId', middleware.Authentication, middleware.Authorisation, Books.getbookById)

router.put('/books/:bookId', middleware.Authentication, middleware.Authorisation, Books.updateBookById)

router.delete('/books/:bookId', middleware.Authentication, middleware.Authorisation, Books.deletebookById)


//review


module.exports = router