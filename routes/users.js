var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')

router
      .get('/', userController.getAll)
      .get('/:userId', userController.getOne)
      .post('/', userController.create)
      .put('/:userId', userController.edit)

module.exports = router;
