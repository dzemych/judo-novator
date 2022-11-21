const AppError = require('../utils/AppError')
const multer = require('multer')
const catchAsync = require('../utils/catchAsync')


const multerFilter = (req, file, cb) => {
   const fileExt = file.mimetype.split('/')[0]

   if (fileExt !== 'image')
      return cb(new AppError('Upload only images', 415), false)

   cb(null, true)
}

const upload = multer({
   fileFilter: multerFilter,
   storage: multer.memoryStorage()
})

exports.uploadPhotos = upload.array('photos')

exports.checkAlbumPhotos = method => catchAsync(async (req, res, next) => {
   if (method === 'post')
      if (!req.files || req.files.length < 4)
         return next(new AppError('Min photos length - 4', 400))

   next()
})

exports.checkBlogPhotos = method => catchAsync(async (req, res, next) => {
   if (method === 'post')
      if (!req.files || req.files.length < 2)
         return next(new AppError('Min photos length - 2', 400))

   next()
})

exports.checkEventPhoto = method => catchAsync(async (req, res, next) => {
   if (method === 'post')
      if (!req.files || req.files.length !== 1)
         return next(new AppError('One photo needed', 400))

   next()
})

exports.checkTeamPhoto = method => catchAsync(async (req, res, next) => {
   if (method === 'post')
      if (!req.files || req.files.length !== 1)
         return next(new AppError('One photo needed', 400))

   next()
})

exports.checkHallPhoto = method => catchAsync(async (req, res, next) => {
   if (method === 'post')
      if (!req.files || req.files.length !== 2)
         return next(new AppError('Two photo needed', 400))

   next()
})