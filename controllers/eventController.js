const Event = require('../models/Event')
const StaticticBefore = require('../models/StaticticBefore')
const StaticticAfter = require('../models/StatisticAfter')


module.exports = {
  create: (req,res) => {
    let { name, place, date, price, timeStart, timeEnd, latitude, longitude, description } =  JSON.parse(req.body.data)
    let body = { name, place, date, price, timeStart, timeEnd, latitude, longitude, description }

    let obj = {
      ...body,
      promotorId: req.current_promotor._id,
      userId: [],
      userAttend: []
    }

    if (req.file) {
      obj.imageUrl = req.file.cloudStoragePublicUrl
    }

    Event
      .create(obj)
      .then(even => {
        res.status(201).json({ event: even, message: 'success create an event' })
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  getAll: (req, res) => {
    Event
      .find()
      .populate('promotorId')
      .populate('userId')
      .then(events => {
        res.status(200).json({ events: events, message: 'success get all events' })
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  getOne: (req, res) => {
    let { eventId } = req.params
    Event
      .findById(eventId)
      .then(even => {
        res.status(200).json({ event: even, message: 'success get an event' })
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  edit: (req, res) => {
    let { eventId } = req.params

    let event = JSON.parse(req.body.data)

    if (req.file) {
      event.imageUrl = req.file.cloudStoragePublicUrl
    }

    Event
      .findByIdAndUpdate(eventId, event)
      .then(even => {
        res.status(200).json({ event: even, message: 'success update an event' })
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  emotion: (req, res) => {
    let { deviceId, emotion, imageUrl, timeCapture } = req.body
    Event
      .find(deviceId)
      .then(event => {
        if (event) {
          //ga tau harus dirubah apa, ke format date dulu ?
          if (timeCapture > event.timeStart) {
            return StaticticAfter.create({ eventId: event._id, image: imageUrl, emotion: emotion })
          } else {
            return StaticticBefore.create({ eventId: event._id, image: imageUrl, emotion: emotion })
          }
        } else {
          throw new Error({message: 'not found'})
        }
      })
      .then(statistic => {
        res.status(200).json({ message: 'success identify user emotion' })
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  attendances: (req, res) => {
    let { eventId, userId } = req.params
    Event
      .findByIdAndUpdate(eventId, { $push : { userAttend: userId }})
      .then(() => {
        res.status(200).json({ message: `user ${userId} attended event ${eventId}`})
      })
      .catch((error) => {
        res.status(400).json({ message: error.message })
      })
  }
}