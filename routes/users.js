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
      .get('/myevent', userController.myEvent)
      .put('/', userController.edit)
      .put('/join/:eventId', userController.joinEvent)

module.exports = router;
