const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String, 
  email: String,
  dob: Date,
  gender: String,
  password: String
})

UserSchema.pre('save',function(next) {
  if(this.password) {
    this.password = encrypt(this.password)
  }
  next()
})

const User = mongoose.model('User', UserSchema)
module.exports = User