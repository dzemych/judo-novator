const { Router } = require('express')
const handlerFactory = require('../controllers/handlerFactory')
const photoController = require('../controllers/photo.controller')
const albumController = require('../controllers/album.controller')


const router = Router()

module.exports = router