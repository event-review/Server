const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statisticSchema = new Schema({
  eventId: {type: Schema.Types.ObjectId, ref: 'Event'},
  image: String,
  emotion: Array
})

const AfterEvent = mongoose.model('AfterEvent', statisticSchema)
module.exports = AfterEvent