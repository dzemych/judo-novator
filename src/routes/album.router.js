const { Router } = require('express')
const Album = require('../models/album.model')
const handlerFactory = require('../controllers/handlerFactory')
const photoController = require('../controllers/photo.controller')
const Event = require('../models/event.model')


const router = Router()

router
   .route('/')
   .get(handlerFactory.getAll(Album))
   .post(
      photoController.uploadPhotos,
      photoController.checkAlbumPhotos('post'),
      handlerFactory.createOneWithFormData(Album)
   )

router.use(handlerFactory.checkExistence(Event))

router
   .route('/:id')
   .get(handlerFactory.getOneById(Album))
   .patch(
      photoController.uploadPhotos,
      photoController.checkAlbumPhotos('patch'),
      handlerFactory.updateOneWithFormData(Album)
   )
   .delete(handlerFactory.deleteOne(Album))


module.exports = router