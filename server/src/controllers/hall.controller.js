const catchAsync = require('../utils/catchAsync')
const Hall = require('../models/hall.model')
const AppError = require("../utils/AppError");
const {
   updateMainPhotoAndBack,
   processAndGetNewPhotos,
   checkAndCreateDir,
   writeAndGetPhotos, getAbsPath
      } = require("../utils/photoUtils");


const processPhotos = (srcArr, item, type) => {
   // 1) Get relative paths and photo names
   const relativePaths = srcArr.map(el => el.split('/').slice(-4))

   // 2) Write photos to proper dirs
   if (type !== 'update')
      checkAndCreateDir(`public/img/hall/${item._id}`)

   // 3) Write and get photos
   return writeAndGetPhotos(relativePaths, item._id.toString(), 'hall')
}

exports.getMainHall = catchAsync(async (req, res, next) => {
   const items = await Hall.find()
   const item = items[0]

   if (item)
      item.photos = item.photos.map(getAbsPath)

   res.json({
      ok: true,
      status: 'success',
      message: 'Item found',
      item: item ? item : {}
   })
})

exports.updateMainHall = catchAsync(async (req, res, next) => {
   // 1) Check if data is valid and if there is such item
   // if (!req.body.data)
   //    return next(new AppError('Provide text data in data field', 400))

   // Parse body data from json to obj and check photos arr
   const data = JSON.parse(req.body.data)
   if (data.photos.length < 2)
      return next(new AppError('Provide at least two photos for your album', 400))

   let items = await Hall.find()
   let item = items[0]

   if (!item) {
      item = await Hall.create(data)

      await updateMainPhotoAndBack(
         data.mainPhoto || req.file.buffer,
         'hall',
         item,
         next
      )

      item.photos = processPhotos(data.photos, item)
   } else {
      Object.keys(data).forEach(key => {
         item[key] = data[key]
      })

      if (req.file || data.mainPhoto)
         await updateMainPhotoAndBack(
            data.mainPhoto || req.file.buffer,
            'hall',
            item,
            next
         )

      // 3) Process temp photos and get new photos arr
      item.photos = processAndGetNewPhotos(data, item, 'hall')
   }

   await item.save({ new: true })

   res.json({
      ok: true,
      message: 'Hall successfully updated',
      item
   })
})