const { Router } = require('express')
const handlerFactory = require('../controllers/handlerFactory')
const Blog = require('../models/blog.model')
const photoController = require('../controllers/photo.controller')


const router = Router()

router.get('/check/:slug', handlerFactory.checkUniqueSlug(Blog))

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
   .get(handlerFactory.getOne(Blog))
   .patch(
      handlerFactory.checkExistence(Blog),
      photoController.uploadOnePhoto,
      handlerFactory.updateOneWithFormData(Blog)
   )
   .delete(handlerFactory.deleteOne(Blog))


module.exports = router