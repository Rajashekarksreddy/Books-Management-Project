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

module.exports = router