const express = require('express')
const app = express()

const authRouter = require('./server/routes/auth')

app.use('/api/auth', authRouter)

module.exports = app
