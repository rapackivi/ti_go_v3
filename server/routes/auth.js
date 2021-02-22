const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')
//localhost:3000/api/auth/login

router.post('/login', controller.login)
router.post('/register', controller.registration)


module.exports = router
