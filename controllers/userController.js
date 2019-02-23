const User = require('../models/User')
const { checkPassword } = require('../helpers/helper')
const jwt = require('jsonwebtoken')

module.exports = {
  create: (req, res) => {
    console.log('masuk register user')
    let { name, email, password, gender, dob } = req.body
    let user = { name, email, password, gender, dob }

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
        } else if (errors.dob) {
          message = errors.dob.message
        } else if (errors.gender) {
          message = errors.gender.message
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
            let token = jwt.sign({ email, role: 'User' }, process.env.JWT_SECRET);
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
    User
      .find()
      .then(users => {
        res.status(200).json({users})
      })
      .catch(error => {
        res.status(400).json({ message: error.message })
      })
  },

  getOne: (req, res) => {
    let userId = req.current_user._id
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
    let userId = req.current_user._id

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