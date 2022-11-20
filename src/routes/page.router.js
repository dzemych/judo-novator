const { Router } = require('express')
const express = require("express");
const path = require("path");
const pageController = require('../controllers/page.controller')


const router = Router()

// router.use('/', express.static(path.join(__dirname, '../../client/out')))
router.use('/', (req, res) => {
   const outPath = path.join(__dirname, '../../client/out')
   const url = req.originalUrl.split('/')[1]

   console.log(url)
   res.sendFile(path.join(outPath, `${url}.html`))
})
router.route('/*', express.static(path.join(__dirname, '../../client/out/404.html')))

module.exports = router