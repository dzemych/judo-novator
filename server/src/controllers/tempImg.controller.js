const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const multer = require("multer");
const path = require('path')
const { checkAndCreateDir, resizeAndWritePhoto, multerFilter } = require("../utils/photoUtils");


const upload = multer({
   fileFilter: multerFilter,
   storage: multer.memoryStorage()
})

exports.uploadMulter = upload.single('upload')

exports.uploadTempImg = catchAsync(async (req, res, next) => {
   const folderPath = `${req.params.collection}-${req.params.timeStamp}`
   const fileName = `${folderPath}-${Date.now() + 1000}.jpg`

   const dirPath = await checkAndCreateDir([
      'img',
      'temp',
      folderPath
   ], true)

   await resizeAndWritePhoto( req.file.buffer, path.join(dirPath, fileName) )

   res.json({
      ok: true,
      message: 'File has been temporary uploaded to server',
      url: `http://localhost:5000/img/temp/${folderPath}/${fileName}`
   })
})

exports.notFound = catchAsync(async (req, res, next) => {
   res.status(404).json({
      ok: false,
      message: 'To temporary upload photos use this endpoint: img/temp/[collectionName][uid]'
   })
})