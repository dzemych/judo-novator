const { Router } = require('express')
const tempImgController = require('../controllers/tempImg.controller')
const authController = require('../controllers/auth.controller')


const router = Router()

router.post(
   '/temp/:collection/:timeStamp',
   tempImgController.uploadMulter,
   tempImgController.uploadTempImg
)

router.delete(
   '/temp/:collection/:timeStamp',
   tempImgController.deleteFolder
)

router.delete(
   '/temp/:collection/:timeStamp/:imgId',
   tempImgController.deleteTempImg
)

router.route('/temp/*', tempImgController.notFound)

module.exports = router