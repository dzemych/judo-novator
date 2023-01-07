const Router = require('express')
const Event = require('../db/models/event.model')
const handlerFactory = require('../controllers/handlerFactory')
const photoController = require('../controllers/photo.controller')


const router = Router()

router.get('/check/:slug', handlerFactory.checkUniqueSlug(Event))

router
   .route('/')
   .get(handlerFactory.getAll(Event))
   .post(
      photoController.uploadOnePhoto,
      handlerFactory.createOneWithFormData(Event)
   )

router
   .route('/:id')
   .get(handlerFactory.getOne(Event))
   .patch(
      handlerFactory.checkExistence(Event),
      photoController.uploadOnePhoto,
      handlerFactory.updateOneWithFormData(Event)
   )
   .delete(handlerFactory.deleteOne(Event))

module.exports = router