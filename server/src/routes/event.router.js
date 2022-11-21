const Router = require('express')
const Event = require('../models/event.model')
const handlerFactory = require('../controllers/handlerFactory')
const photoController = require('../controllers/photo.controller')


const router = Router()

router
   .route('/')
   .get(handlerFactory.getAll(Event))
   .post(
      photoController.uploadPhotos,
      photoController.checkEventPhoto('post'),
      handlerFactory.createOneWithFormData(Event)
   )

router.use(handlerFactory.checkExistence(Event))

router
   .route('/:id')
   .get(handlerFactory.getOneById(Event))
   .patch(
      photoController.uploadPhotos,
      photoController.checkEventPhoto('patch'),
      handlerFactory.updateOneWithFormData(Event)
   )
   .delete(handlerFactory.deleteOne(Event))

module.exports = router