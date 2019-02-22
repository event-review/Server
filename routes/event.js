var express = require('express');
var router = express.Router();
const eventController = require('../controllers/eventController')
const isPromotorLogin = require('../middlewares/isPromotorLogin')
const isEventOwner = require('../middlewares/isEventOwner')

router
      .get('/', eventController.getAll)
      .get('/:eventId', eventController.getOne)

router
      .use(isPromotorLogin)
      .post('/', isEventOwner, eventController.create)
      .put('/:eventId',  isEventOwner, eventController.edit)

module.exports = router;
