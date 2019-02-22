const Promotor = require('../models/Promotor')

module.exports = {
  create: (req, res) => {
    let { name, email, gender, dob } = req.body
    let newPromotor = { name, email, gender, dob }

    Promotor
      .create(newPromotor)
      .then(promotor => {
        res.status(201).json({ promotor })
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  getAll: (req, res) => {

  },

  getOne: (req, res) => {
    let { promotorId } = req.params
    Promotor
      .findById(promotorId)
      .then(promotor => {
        res.json({ promotor })
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  edit: (req, res) => {
    let { promotorId } = req.params
    let { name, email, gender, dob } = req.body
    let newPromotor = { name, email, gender, dob }

    for (let key in newPromotor) {
      if (newPromotor[key] === undefined) {
        delete newPromotor[key]
      }
    }

    Promotor
      .findByIdAndUpdate(promotorId, newPromotor, { new: true })
      .then(promotor => {
        res.status(201).json({ promotor })
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  }
}