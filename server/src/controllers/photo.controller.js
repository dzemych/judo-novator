const AppError = require('../utils/AppError')
const multer = require('multer')
const catchAsync = require('../utils/catchAsync')
const photoUtils = require('../utils/photoUtils')


const upload = multer({
   fileFilter: photoUtils.multerFilter,
   storage: multer.memoryStorage()
})

exports.uploadPhotos = upload.array('photos')

exports.uploadOnePhoto = upload.single('photo')

exports.atLeastOnePhotoCheck = catchAsync(async (req, res, next) => {
   if (!req.file)
      return next(new AppError('Please provide photo in req in photo filed with form data', 400))

   next()
})

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