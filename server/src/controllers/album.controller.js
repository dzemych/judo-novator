const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const Album = require('../models/album.model')
const ObjectId = require('mongoose').Types.ObjectId
const fs = require('fs')
const path = require('path')
const {
   updateMainPhotoAndBack,
   getAbsPath,
   checkAndCreateDir,
   writeAndGetPhotos,
   deleteDir,
   getPhotoPath,
   renamePhotoAndGetPath
} = require('../utils/photoUtils')


const processPhotos = (srcArr, item, type) => {
   // 1) Get relative paths and photo names
   const relativePaths = srcArr.map(el => el.split('/').slice(-4))

   // 2) Write photos to proper dirs
   if (type !== 'update')
      checkAndCreateDir(`public/img/album/${item._id}`)

   // 3) Write and get photos
   return writeAndGetPhotos(relativePaths, item._id.toString(), 'album')
}

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

   item.photos = processPhotos(data.photos, item)

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

   Object.keys(data).forEach(key => {
      item[key] = data[key]
   })

   if (!item)
      return next(new AppError('No item with such slug or id', 404))

   // 2) Update main photo
   if (req.file || data.mainPhoto)
      await updateMainPhotoAndBack(
         data.mainPhoto || req.file.buffer,
         'album',
         item,
         next
      )

   // 3) Get relative paths for photos arr
   const photosCandidate = data.photos.map(el =>
      ['public', ...el.split('/').slice(-4)].join('/')
   )

   // 4) Get new photos arr and move newly added photos to proper dir
   let tempRelDir
   const newPhotos = photosCandidate.map((el, idx) => {
      const isOld = item.photos.includes(getAbsPath(el))

      // If it's old photo (order) of old path hasn't changed return it
      if (isOld && getPhotoPath('album', item._id, idx) === el)
         return el

      // Save temp dir path to delete it later
      if (!tempRelDir && !isOld) tempRelDir = el

      // If order has changed, or it's new rename photo and get its path
      return renamePhotoAndGetPath('album', item._id, idx, el)
   })

   // 5) Delete temp dir if it's (from newly added photos)
   try {
      if (tempRelDir) deleteDir(tempRelDir.split('/'))
   } catch (e) {
      throw new AppError(`Error during deleting temp directory (${tempRelDir}): ${e.message}`, 500)
   }

   // 6) Delete old photos that is not in new photos arr
   try {
      const relDirPath = `public/img/album/${item._id}`
      const files = fs.readdirSync(path.resolve(relDirPath))

      files.forEach(el => {
         const photoPath = `${relDirPath}/${el}`

         if (
            !(newPhotos.includes(photoPath)) &&
            el.split('-')[0] !== 'back' &&
            el.split('-')[0] !== 'main'
         )
            deleteDir(photoPath)
      })
   }
   catch (e) {
      throw new AppError(`Error during deleting old photos: ${e.message}`, 500)
   }

   // 7) Save new photos to db
   item.photos = newPhotos
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