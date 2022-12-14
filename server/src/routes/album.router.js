const { Router } = require('express')
const Album = require('../models/album.model')
const handlerFactory = require('../controllers/handlerFactory')
const photoController = require('../controllers/photo.controller')


const router = Router()

router.get('/check/:slug', handlerFactory.checkUniqueSlug(Album))

router
   .route('/')
   .get(handlerFactory.getAll(Album))
   .post(
      photoController.uploadOnePhoto,
      photoController.atLeastOnePhotoCheck,
      handlerFactory.createOneWithFormData(Album)
   )

router
   .route('/:id')
   .get(handlerFactory.getOne(Album))
   .patch(
      handlerFactory.checkExistence(Album),
      photoController.uploadOnePhoto,
      handlerFactory.updateOneWithFormData(Album)
   )
   .delete(handlerFactory.deleteOne(Album))


module.exports = router