const Router = require('express')
const Event = require('../models/event.model')
const handlerFactory = require('../controllers/handlerFactory')
const photoController = require('../controllers/photo.controller')


const router = Router()

router
   .route('/')
   .get(handlerFactory.getAll(Event))
   .post(
      photoController.uploadOnePhoto,
      photoController.atLeastOnePhotoCheck,
      handlerFactory.createOneWithFormData(Event)
   )

router
   .route('/:id')
   .get(handlerFactory.getOneById(Event))
   .patch(
      handlerFactory.checkExistence(Event),
      photoController.uploadOnePhoto,
      handlerFactory.updateOneWithFormData(Event)
   )
   .delete(handlerFactory.deleteOne(Event))

module.exports = router