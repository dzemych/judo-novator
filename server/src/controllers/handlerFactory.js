const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const APIfeatures = require('../utils/APIfeatures')
const path = require('path')
const {
   checkAndCreateDir,
   deleteDir,
   deletePhotoFiles,
   writeAndGetPhotos,
   resizeAndWritePhoto,
} = require('../utils/photoUtils')
const {log} = require("sharp/lib/libvips");


const processContent = (content) => {
   // const formatedContent

   return content
}

exports.checkExistence = collection => catchAsync(async (req, res, next) => {
   const itemExists = await collection.exists({ _id: req.params.id })
   if (!itemExists)
      return next(new AppError('No item exists with such id', 404))

   next()
})

exports.createOneWithFormData = collection => catchAsync(async (req, res, next) => {
   if (!req.body.data)
      return next(new AppError('Put all necessary fields in data field', 400))

   // 1) Create item from data field in request
   const data = JSON.parse(req.body.data)
   const item = await collection.create(data)

   const modelName = item.constructor.modelName.toLowerCase()
   const uid = item._id

   // ! Format content field (change src)
   if (req.body.folderName)
      item.formatContent(req.body.folderName)

   // 2) Create dir for main img
   const dirPath = `public/img/${modelName}/${uid}`

   // * If error during directory creating delete db document
   try {
      await checkAndCreateDir(dirPath)
   } catch (e) {
      await item.remove()
      return next(new AppError(`Error during dir check: ${e.message}`, 500))
   }

   // 3) Write main photo(450px width) and back photo (full width)
   const backPhotoName = `back-${modelName}-${uid}.jpg`
   const mainPhotoName = `main-${modelName}-${uid}.jpg`

   // * If error during photo write delete db document and dir for photos
   try {
      await resizeAndWritePhoto(req.file.buffer, path.join(dirPath, backPhotoName))
      await resizeAndWritePhoto(req.file.buffer, path.join(dirPath, mainPhotoName), 300)
   } catch(e) {
      deleteDir(`public/img/${modelName}/${uid}`)
      await item.remove()

      return next(new AppError(`Error during photo writing: ${e.message}`, 500))
   }

   // 4) Save item
   item.mainPhoto = `${dirPath}/${mainPhotoName}`
   item.backgroundPhoto = `${dirPath}/${backPhotoName}`
   await item.save({ new: true })

   res.status(201).json({
      ok: true,
      statusText: 'OK',
      message: `${modelName} successfully created`,
      item
   })
})

exports.updateOneWithFormData = collection => catchAsync(async (req, res, next) => {
   const id = req.params.id
   const modelName = collection.collection.collectionName
      .split('').slice(0, -1).join('')

   // 1) Update document in database
   if (req.body.data) {
      await collection.findByIdAndUpdate(
         id,
         JSON.parse(req.body.data),
         { runValidators: true }
      )
   }

   // 2) Write photos and add them to db
   if (req.files.length > 0) {
      // 2) Check if we have all necessary directories for photo
      await checkAndCreateDir(['img', modelName, id])

      await deletePhotoFiles(modelName, id)
      const photosObj = await writeAndGetPhotos(req.files, id, modelName)

      await collection.findByIdAndUpdate(
         id,
         photosObj,
         { runValidators: true }
      )
   }

   res.status(200).json({
      ok: true,
      statusText: 'OK',
      message: `${modelName} was successfully updated.`,
   })
})

exports.createOne = collection => catchAsync(async (req, res, next) => {

   // if (!req.body.folderId)
   //    return next(new AppError('Provide folder id to take photos from there', 400))

   const item = await collection.create(req.body)

   res.status(201).json({
      ok: true,
      status: 'success',
      message: 'Item successfully created.',
      item: item
   })
})

exports.getAll = (collection, optQuery = {}) => catchAsync(async (req, res) => {
   const features = new APIfeatures(collection, {
      ...req.query, ...optQuery
   })

   features
      .filter()
      .sort()
      .select()
      .paginate()

   // 3) Get queried data
   const data = await features.query.lean()

   res.json({
      status: 'success',
      message: 'Data successfully received',
      results: data.length,
      data
   })
})

exports.getOneById = collection => catchAsync(async (req, res, next) => {
   const item = await collection.findById(req.params.id)
   if (!item)
      return next(new AppError('No item found with that id', 404))

   res.json({
      ok: true,
      status: 'success',
      message: 'Item found',
      item
   })
})

exports.updateOne = collection => catchAsync(async (req, res, next) => {
   if (!req.body)
      return next(new AppError('No body to update', 400))

   const item = await collection.findById(req.params.id)

   if (!item)
      return next(new AppError('No item found with that id', 404))

   Object.keys(req.body).forEach(key => {
      item[key] = req.body[key]
   })

   await item.save({ new: true })

   res.json({
      ok: true,
      status: 'success',
      message: 'Item successfully updated',
      item
   })
})

exports.deleteOne = collection => catchAsync(async (req, res) => {
   const deletedItem = await collection.findByIdAndRemove(req.params.id)
   const modelName = deletedItem.constructor.modelName

   await deleteDir(modelName.toLowerCase(), req.params.id)

   res.status(204).json()
})