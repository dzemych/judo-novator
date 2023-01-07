const { Router } = require('express')
const dataController = require('../controllers/data.controller')
const handlerFactory = require('../controllers/handlerFactory')
const Data = require('../db/models/data.model')
const photoController = require("../controllers/photo.controller");


const router = Router()

// Client cannot delete any document, cause model Hall responds for main site data,
// that cannot be deleted, but can be crated if there are no

router.get('/check/:id', dataController.checkExistence)

router
   .route('/')
   .get(handlerFactory.getAll(Data))
   .post(
      photoController.uploadOnePhoto,
      dataController.createData
   )

router
   .route('/:id')
   .get(dataController.getOneData)
   .patch(
      photoController.uploadOnePhoto,
      dataController.updateData
   )

module.exports = router