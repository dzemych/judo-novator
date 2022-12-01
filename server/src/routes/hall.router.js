const Router = require('express')
const Hall = require('../models/hall.model')
const handlerFactory = require("../controllers/handlerFactory")
const photoController = require('../controllers/photo.controller')


const router = Router()

router
   .route('/')
   .get(handlerFactory.getAll(Hall))
   .post(
      photoController.uploadOnePhoto,
      photoController.atLeastOnePhotoCheck,
      handlerFactory.createOneWithFormData(Hall)
   )

router
   .route('/:id')
   .get(handlerFactory.getOneById(Hall))
   .patch(
      handlerFactory.checkExistence(Hall),
      photoController.uploadOnePhoto,
      handlerFactory.updateOneWithFormData(Hall)
   )
   .delete(handlerFactory.deleteOne(Hall))


module.exports = router