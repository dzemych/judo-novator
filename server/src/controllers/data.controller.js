const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const Data = require('../db/models/data.model')
const {updateMainPhotoAndBack, processAndGetNewPhotos, processPhotos, getAbsPath} = require("../utils/photoUtils")


exports.checkExistence = catchAsync(async (req, res, next) => {
   const item = await Data.exists({ _id: req.params.id })

   if (!item)
      res.json({
         ok: true,
         status: 'success',
         exists: false,
         message: 'Item do not exists'
      })
   else
      res.json({
         ok: true,
         status: 'success',
         exists: true,
         message: 'Item found'
      })
})

exports.getOneData = catchAsync(async (req, res, next) => {
   if (!req.params.id)
      return next(new AppError('Please provide id in url as the last path', 400))

   const item = await Data.findById(req.params.id)
   if (!item)
      return next(new AppError('Data with such id not found', 404))

   if (item.photos)
      item.photos = item.photos.map(getAbsPath)

   res.json({
      ok: true,
      status: 'success',
      message: 'Data was found',
      item
   })
})

exports.createData = catchAsync(async (req, res, next) => {
   if (!req.body)
      return next(new AppError('No data to create from', 400))

   const data = JSON.parse(req.body.data)
   const item = await Data.create(data)

   if (!item.content && data.photos)
      item.photos = processPhotos(data.photos, item, 'create', 'data')

   await item.save({ new: true })

   // 2) Write proper main and back photo paths main photo is provided as file
   if (req.file || data.mainPhoto)
      await updateMainPhotoAndBack(
         data.mainPhoto || req.file.buffer,
         'data',
         item,
         next
      )

   res.status(201).json({
      ok: true,
      statusText: 'OK',
      message: `Data successfully created`,
      item
   })
})

exports.updateData = catchAsync(async (req, res, next) => {
   const data = req.body.data ? JSON.parse(req.body.data) : ''

   // Normal save doesn't work on paths that are not in schema
   const item = await Data.findByIdAndUpdate(req.params.id).set(data)
   if (!item)
      return next(new AppError('Data with such id not found', 404))

   if (!item.content && data.photos)
      item.photos = processAndGetNewPhotos(data.photos, item, 'data')

   await item.save({ new: true })

   // 2) Update main photo
   if (req.file || data.mainPhoto) {
      await updateMainPhotoAndBack(
         data.mainPhoto || req.file.buffer,
         'data',
         item,
         next
      )
   }

   res.status(200).json({
      ok: true,
      statusText: 'OK',
      message: `Data was successfully updated.`,
      item: item
   })
})