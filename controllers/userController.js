const User = require('../models/User')
const { checkPassword } = require('../helpers/helper')

module.exports = {
  create: (req, res) => {
    let { name, email, gender, dob } = req.body
    let newPromotor = { name, email, gender, dob }

    User
      .create(user)
      .then(user => {
        res.status(200).json({ user, message: 'success register, please login to continue' })
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

  signIn: (req, res) => {
    let { email, password } = req.body

    User
      .findOne({ email })
      .then(user => {
        if (user) {
          if (checkPassword(password, user.password)) {
            let token = jwt.sign({ email }, process.env.SECRET);
            res.status(200).json({ message: 'success login', token: token, userId: user._id })
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
  },

  getAll: (req, res) => {

  },

  getOne: (req, res) => {
    let { userId } = req.params
    User
      .findById(userId)
      .then(user => {
        res.status(200).json({ user })
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  edit: (req, res) => {
    let { userId } = req.params

    User
      .findByIdAndUpdate(userId, req.body, { new: true })
      .then( user => {
        res.status(200).json({user, message: 'success edit'})
      })
      .catch( error => {
        res.status(400).json({message: error.message})
      })
  }
}