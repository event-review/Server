var express = require('express');
var router = express.Router();
const eventController = require('../controllers/eventController')
const isPromotorLogin = require('../middlewares/isPromotorLogin')

router
      .get('/', eventController.getAll)
      .get('/:eventId', eventController.getOne)
      .post('/', isPromotorLogin, eventController.create)
      .put('/:eventId', isPromotorLogin, eventController.edit)

module.exports = router;
