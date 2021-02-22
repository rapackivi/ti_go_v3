//JWT strategy
const jwtStrategy = require('passport-jwt').Strategy
const jwtFromRequest = require('passport-jwt').ExtractJwt.fromAuthHeaderAsBearerToken()

const secretOrKey = require('../config/keys').jwt
const User = require('../models/User')
const GOOGLE_CLIENT_ID = require('../config/keys').GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = require('../config/keys').GOOGLE_CLIENT_SECRET

const jwtStrategyOptions = {
  jwtFromRequest,
  secretOrKey
}
//====================
//google strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const googleStrategyOptions = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/time-go"
}

module.exports = passport => {
  passport.use( new jwtStrategy(jwtStrategyOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.userId).select('id, email')
      done(null, user || false)
    } catch (error) {
      done(e, false)
    }
  }))
  passport.use( new GoogleStrategy(googleStrategyOptions, (accessToken, refreshToken, profile, cb)=>{
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }))
}