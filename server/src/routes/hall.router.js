const Router = require('express')
const Hall = require('../models/hall.model')
const handlerFactory = require("../controllers/handlerFactory")
const photoController = require('../controllers/photo.controller')


const router = Router()

router.get('/check/:slug', handlerFactory.checkUniqueSlug(Hall))

router
   .route('/')
   .get(handlerFactory.getAll(Hall))
   .post(
      photoController.uploadOnePhoto,
      handlerFactory.createOneWithFormData(Hall)
   )

router
   .route('/:id')
   .get(handlerFactory.getOne(Hall))
   .patch(
      handlerFactory.checkExistence(Hall),
      photoController.uploadOnePhoto,
      handlerFactory.updateOneWithFormData(Hall)
   )
   .delete(handlerFactory.deleteOne(Hall))


module.exports = router