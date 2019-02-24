var express = require('express');
var router = express.Router();
const eventController = require('../controllers/eventController')
const isPromotorLogin = require('../middlewares/isPromotorLogin')
const isEventOwner = require('../middlewares/isEventOwner')
const {sendUploadToGCS,multer} = require('../middlewares/upload')

router
      .get('/', eventController.getAll)
      .get('/:eventId', eventController.getOne)

router
      .use(isPromotorLogin)
      // .post('/', eventController.create)
      .post('/',  multer.single('file'), sendUploadToGCS, eventController.create)
      .post('/emotion', eventController.emotion)
      // .put('/:eventId',  isEventOwner, eventController.edit)
      .put('/:eventId',  isEventOwner,  multer.single('file'), sendUploadToGCS, eventController.edit)

module.exports = router;
