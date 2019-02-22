var express = require('express');
var router = express.Router();
const promotorController = require('../controllers/promotorController')

router
      // .get('/', promotorController.getAll)
      .get('/:promotorId', promotorController.getOne)
      .post('/', promotorController.create)
      .put('/:promotorId', promotorController.edit)

module.exports = router;
