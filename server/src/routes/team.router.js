const {Router} = require('express')
const handlerFactory = require('../controllers/handlerFactory')
const Team = require('../models/team.model')
const photoController = require('../controllers/photo.controller')


const router = Router()

router.get('/check/:slug', handlerFactory.checkUniqueSlug(Team))

router
   .route('/')
   .post(
      photoController.uploadPhotos,
      photoController.checkTeamPhoto('post'),
      handlerFactory.createOneWithFormData(Team)
   )
   .get(handlerFactory.getAll(Team))

router
   .route('/:id')
   .get(handlerFactory.getOne(Team))
   .patch(
      photoController.uploadPhotos,
      photoController.checkTeamPhoto('patch'),
      handlerFactory.updateOneWithFormData(Team)
   )
   .delete(handlerFactory.deleteOne(Team))


module.exports = router