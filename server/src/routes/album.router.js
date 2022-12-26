const { Router } = require('express')
const Album = require('../models/album.model')
const handlerFactory = require('../controllers/handlerFactory')
const photoController = require('../controllers/photo.controller')
const albumController = require('../controllers/album.controller')


const router = Router()

router.get('/check/:slug', handlerFactory.checkUniqueSlug(Album))

router
   .route('/')
   .get(handlerFactory.getAll(Album))
   .post(
      photoController.uploadOnePhoto,
      albumController.createOne
   )

router
   .route('/:id')
   .get(albumController.getOne)
   .patch(
      photoController.uploadOnePhoto,
      albumController.updateOne
   )
   .delete(handlerFactory.deleteOne(Album))


module.exports = router