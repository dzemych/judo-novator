const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const multer = require("multer");
const path = require('path')
const { checkAndCreateDir, resizeAndWritePhoto, multerFilter, deleteDir } = require("../utils/photoUtils");


const upload = multer({
   fileFilter: multerFilter,
   storage: multer.memoryStorage()
})

exports.uploadMulter = upload.single('upload')

exports.uploadTempImg = catchAsync(async (req, res, next) => {
   const folderPath = `${req.params.collection}-${req.params.timeStamp}`
   const fileName = `${folderPath}-${Date.now() + 1000}.jpg`
   const dirPath = `public/img/temp/${folderPath}`

   try {
      await checkAndCreateDir(dirPath)
   } catch (e) {
      return next(new AppError(`Error during directory check: ${e.message}`, 400))
   }

   try {
      await resizeAndWritePhoto( req.file.buffer, path.join(dirPath, fileName) )
   } catch (e) {
      return next(new AppError(`Error during file writing: ${e.message}`, 400))
   }

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