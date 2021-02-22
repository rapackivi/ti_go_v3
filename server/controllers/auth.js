const bcrypt = require('bcrypt')

const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')
const roundSalt = 9

module.exports.login = (req, res) => {
  res.status(200).json({ login: true })
}

module.exports.registration = (req, res) => {
  User.findOne({ email: req.body.email })
  .then(async result=> {
    if (!result) { 
      await bcrypt.genSalt(roundSalt)
      .then( salt =>  bcrypt.hash(req.body.password, salt))
      .then( hashedPass => new User(
        {
          email: req.body.email,
          password: hashedPass
        }
      ).save())
      .then(user => res.status(201).json(user))
      .catch(e => errorHandler(res, e))
    } else {
      res.status(409).json({message: `user ${req.body.email} already registered!`})
    }
  })
  .catch(e => errorHandler(res, e))
}