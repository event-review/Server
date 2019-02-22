const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statisticSchema = new Schema({
  eventId: {type: Schema.Types.ObjectId, ref: 'Event'},
  image: String,
  emotion: Array
})

const BeforeEvent = mongoose.model('BeforeEvent', statisticSchema)
module.exports = BeforeEvent