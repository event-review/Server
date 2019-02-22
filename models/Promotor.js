const mongoose = require('mongoose')
const Schema = mongoose.Schema

const promotorSchema = new Schema({
  name: String, 
  email: String,
  dob: Date,
  gender: String
})

const Promotor = mongoose.model('Promotor', promotorSchema)
module.exports = Promotor