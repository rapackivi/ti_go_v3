const express = require('express')
const router = express.Router()
const controller = require('../controllers/userpage')
const passport = require('passport')

router.use(passport.authenticate('jwt', { session: false }));
router.use(passport.authenticate('google', { failureRedirect: '/api/auth/login', session: false }))

router.get('/userpage', controller.userpage)


module.exports = router
