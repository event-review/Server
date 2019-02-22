var express = require('express');
var router = express.Router();
const eventController = require('../controllers/eventController')

router
      .get('/', eventController.getAll)
      .get('/:eventId', eventController.getOne)
      .post('/', eventController.create)
      .put('/:eventId', eventController.edit)

module.exports = router;
