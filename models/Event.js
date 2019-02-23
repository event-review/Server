const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
  name: String,
  place: String,
  date: Date,
  userId: [{type: Schema.Types.ObjectId, ref: 'User'}],
  userAttend: [{type: Schema.Types.ObjectId, ref: 'User'}],
  price: Number,
  promotorId: {type: Schema.Types.ObjectId, ref: 'Promotor'},
  status: {type: String, default: "Available"}
})

const Event = mongoose.model('Event', EventSchema)
module.exports = Event