const { Router } = require('express')
const handlerFactory = require('../controllers/handlerFactory')
const Blog = require('../models/blog.model')
const photoController = require('../controllers/photo.controller')
const Event = require('../models/event.model')


const router = Router()

router
   .route('/')
   .get(handlerFactory.getAll(Blog))
   .post(
      // photoController.uploadPhotos,
      // photoController.checkBlogPhotos('post'),
      handlerFactory.createOne(Blog)
   )

router.use(handlerFactory.checkExistence(Event))

router
   .route('/:id')
   .get(handlerFactory.getOneById(Blog))
   .patch(
      photoController.uploadPhotos,
      photoController.checkBlogPhotos('patch'),
      handlerFactory.updateOneWithFormData(Blog)
   )
   .delete(handlerFactory.deleteOne(Blog))


module.exports = router