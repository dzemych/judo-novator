const { Router } = require('express')
const tempImgController = require('../controllers/tempImg.controller')
const authController = require('../controllers/auth.controller')


const router = Router()

router.post(
   '/:folderId',
   tempImgController.uploadTempImg
)

module.exports = router