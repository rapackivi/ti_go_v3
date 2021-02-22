const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')
//localhost:3000/api/auth/login

router.get('/login', controller.login)
router.get('/register', controller.registration)
module.exports = router
