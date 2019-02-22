const Event = require('../models/Event')

module.exports = {
  create: (req,res) => {
    let { name, place, date, price } =  req.body
    let body = { name, place, date, price }
    let obj = {
      ...body,
      promotor: req.current_promotor._id,
      userId: [],
      userAttend: []
    }

    Event
      .create(obj)
      .then(even => {
        res.status(201).json({event: even, message: 'success create an event'})
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  getAll: (req,res)=> {
    Event
      .find()
      .then(events => {
        res.status(200).json({events: events, message: 'success get all events'})
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  getOne: (req,res) => {
    let { eventId } = req.params
    Event
      .findById(eventId)
      .then(even => {
        res.status(200).json({event: even, message: 'success get an event'})
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })

  },

  edit: (req,res) => {
    let { eventId } = req.params
    Event
      .findOneAndUpdate({_id: eventId}, req.body)
      .then(even => {
        res.status(200).json({event: even, message: 'success update an event'})
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  }
}