const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const Album = require('../db/models/album.model')
const ObjectId = require('mongoose').Types.ObjectId
const {
   updateMainPhotoAndBack,
   getAbsPath,
   processAndGetNewPhotos,
   processPhotos
} = require('../utils/photoUtils')


exports.createOne = catchAsync(async (req, res, next) => {
   if (!req.body?.data)
      return next(new AppError('Please provide all data in data field in form data', 400))

   const data = JSON.parse(req.body.data)
   if (data.photos.length < 2)
      return next(new AppError('Please add at least two photos for your album', 400))

   if (!data.mainPhoto && !req.file)
      return next(new AppError('Provide main photo or in upload field as file or in data.mainPhoto', 400))

   const item = await Album.create(data)

   await updateMainPhotoAndBack(
      data.mainPhoto || req.file.buffer,
      'album',
      item,
      next
   )

   item.photos = processPhotos(data.photos, item, 'create', 'album')

   await item.save({ new: true })

   res.status(201).json({
      ok: true,
      message: 'Album successfully created',
      item: { _id: item._id, slug: item.slug }
   })
})

exports.updateOne = catchAsync(async (req, res, next) => {
   // 1) Check if data is valid and if there is such item
   if (!req.body.data)
      return next(new AppError('Provide text data in data field', 400))

   // Parse body data from json to obj and check photos arr
   const data = JSON.parse(req.body.data)
   if (data.photos.length < 2)
      return next(new AppError('Provide at least two photos for your album', 400))

   // ObjectId.isValid not working correctly with certain slugs
   const searchBy = req.params.id
   const isId = ObjectId.isValid(searchBy) && searchBy.split('-').length < 2

   const item = await Album.findOne(isId ? { _id: searchBy } : { slug: searchBy })

   if (!item)
      return next(new AppError('No item with such slug or id', 404))

   Object.keys(data).forEach(key => {
      item[key] = data[key]
   })

   // 2) Update main photo
   if (req.file || data.mainPhoto)
      await updateMainPhotoAndBack(
         data.mainPhoto || req.file.buffer,
         'album',
         item,
         next
      )

   // 3) Save new photos to db
   item.photos = processAndGetNewPhotos(data.photos, item, 'album')
   await item.save({ new: true })

   res.json({
      ok: true,
      message: 'Album successfully updated',
      item
   })
})

exports.getOne = catchAsync(async (req, res, next) => {
   const id = req.params.id
   // ObjectId.isValid not working correctly with certain slugs
   const isId = ObjectId.isValid(id) && id.split('-').length < 2

   const item = await Album.findOne(isId ? { _id: id } : { slug: id })

   if (!item)
      return next(new AppError('No item found with that id', 404))

   item.photos = item.photos.map(getAbsPath)

   res.json({
      ok: true,
      status: 'success',
      message: 'Item found',
      item
   })
})