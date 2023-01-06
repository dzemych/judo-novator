const Router = require('express')
const Hall = require('../models/hall.model')
const handlerFactory = require("../controllers/handlerFactory")
const photoController = require('../controllers/photo.controller')
const hallController = require('../controllers/hall.controller')


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
   .get(hallController.getMainHall)
   .patch(
      photoController.uploadOnePhoto,
      hallController.updateMainHall
   )


module.exports = router