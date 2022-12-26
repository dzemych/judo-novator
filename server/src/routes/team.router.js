const {Router} = require('express')
const handlerFactory = require('../controllers/handlerFactory')
const Team = require('../models/team.model')
const photoController = require('../controllers/photo.controller')
const Blog = require("../models/blog.model");


const router = Router()

router.get('/check/:slug', handlerFactory.checkUniqueSlug(Team))

router
   .route('/')
   .post(
      photoController.uploadOnePhoto,
      photoController.atLeastOnePhotoCheck,
      handlerFactory.createOneWithFormData(Team)
   )
   .get(handlerFactory.getAll(Team))

router
   .route('/:id')
   .get(handlerFactory.getOne(Team))
   .patch(
      handlerFactory.checkExistence(Team),
      photoController.uploadOnePhoto,
      handlerFactory.updateOneWithFormData(Team)
   )
   .delete(handlerFactory.deleteOne(Team))


module.exports = router