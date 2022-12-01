const { Router } = require('express')
const handlerFactory = require('../controllers/handlerFactory')
const Blog = require('../models/blog.model')
const photoController = require('../controllers/photo.controller')


const router = Router()

router
   .route('/')
   .get(handlerFactory.getAll(Blog))
   .post(
      photoController.uploadOnePhoto,
      photoController.atLeastOnePhotoCheck,
      handlerFactory.createOneWithFormData(Blog)
   )

router
   .route('/:id')
   .get(handlerFactory.getOneById(Blog))
   .patch(
      handlerFactory.checkExistence(Blog),
      photoController.uploadOnePhoto,
      handlerFactory.updateOneWithFormData(Blog)
   )
   .delete(handlerFactory.deleteOne(Blog))


module.exports = router