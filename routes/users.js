var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')
const isUserLogin = require('../middlewares/isUserLogin')

router
      .post('/signup', userController.create)
      .post('/signin', userController.signIn)

router
      .use(isUserLogin)
      .get('/', userController.getOne)
      .put('/', userController.edit)

module.exports = router;
