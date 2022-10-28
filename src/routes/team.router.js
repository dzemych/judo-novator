const {Router} = require('express')
const handlerFactory = require('../controllers/handlerFactory')
const Team = require('../models/team.model')
const photoController = require('../controllers/photo.controller')


const router = Router()


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
   .get(handlerFactory.getOneById(Team))
   .patch(
      photoController.uploadPhotos,
      photoController.checkTeamPhoto('patch'),
      handlerFactory.updateOneWithFormData(Team)
   )
   .delete(handlerFactory.deleteOne(Team))


module.exports = router