const mongoose = require('mongoose')
const  findOrCreate = require('mongoose-findorcreate')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: false,
      unique: true
    },
    password: {
      type: String,
      required: false
    },
    googleId: {
      type: String,
      unique: true
    }
  }
)
userSchema.plugin(findOrCreate)

module.exports = mongoose.model('user', userSchema)