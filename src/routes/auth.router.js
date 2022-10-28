const { Router } = require('express')
const handlerFactory = require('../controllers/handlerFactory')
const authController = require('../controllers/auth.controller')
const User = require('../models/user.model')

const router = Router()


router.post('/forgotPassword', authController.forgotPassword)
router.patch('/resetPassword', authController.resetPassword)

router.post('/signup', authController.createUser)
router.post('/login', authController.login)

router.patch('/confirmAcc', authController.confirmAccount)

router.get(
   '/me',
   authController.protectAndSetId,
   authController.setIdAsParams,
   handlerFactory.getOneById(User)
)

router.use(
   authController.protectAndSetId,
   authController.restrictTo(['root', 'admin'])
)

router.patch(
   '/users/:id',
   authController.protectAndSetId,
   authController.checkPasswordBeforeUpdate,
   handlerFactory.updateOne(User)
)

router.get('/users', handlerFactory.getAll(User))
router.get('/users/:id', handlerFactory.getOneById(User))

module.exports = router