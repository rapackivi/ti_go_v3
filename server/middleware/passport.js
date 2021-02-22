const jwtStrategy = require('passport-jwt').Strategy
const jwtFromRequest = require('passport-jwt').ExtractJwt.fromAuthHeaderAsBearerToken()

const secretOrKey = require('../config/keys').jwt
const User = require('../models/User')

const jwtStrategyOptions = {
  jwtFromRequest,
  secretOrKey
}

module.exports = passport => {
  passport.use(
    new jwtStrategy(jwtStrategyOptions, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('id, email')
        done(null, user || false)
      } catch (error) {
        done(e, false)
      }
    })
  )
}