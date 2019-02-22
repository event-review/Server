const Promotor = require('../models/Promotor')
const { checkPassword } = require('../helpers/helper')

module.exports = {
  create: (req, res) => {
    let { name, email, gender, dob } = req.body
    let newPromotor = { name, email, gender, dob }

    Promotor
      .create(newPromotor)
      .then(promotor => {
        res.status(200).json({ promotor, message: 'success register, please login to continue' })
      })
      .catch(error => {
        let message = error.message
        let errors = error.errors

        if (errors.name) {
          message = errors.name.message
        } else if (errors.email) {
          message = errors.email.message
        } else if (errors.password) {
          message = errors.password.message
        }

        res.status(400).json({ message })
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
  },

  signIn: (req, res) => {
    let { email, password } = req.body

    Promotor
      .findOne({ email })
      .then(promotor => {
        if (promotor) {
          if (checkPassword(password, promotor.password)) {
            let token = jwt.sign({ email }, process.env.SECRET);
            res.status(200).json({ message: 'success login', token: token, promotorId: promotor._id })
          } else {
            res.status(400).json({ message: "wrong email / password" })
          }
        } else {
          res.status(400).json({ message: "wrong email / password" })
        }
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  }
}