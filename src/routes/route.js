const express = require('express')
const userRegister = require('../Controllers/UserController')

const router = express.Router()

router.post('/register', userRegister.userRegister)

module.exports = router