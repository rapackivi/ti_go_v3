const express = require('express')
const router = express.Router()
//localhost:3000/api/auth/login
router.get('/login', (req, res)=> res.status(200).json({ login: true }))

module.exports = router
