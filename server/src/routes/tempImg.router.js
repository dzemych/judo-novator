const { Router } = require('express')
const tempImgController = require('../controllers/tempImg.controller')
const authController = require('../controllers/auth.controller')


const router = Router()

router.post(
   '/:folderId',
   tempImgController.uploadMulter,
   tempImgController.uploadTempImg
)

module.exports = router