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


const updateMainPhotoAndBack = async (file, modelName, item, next) => {
   const id = item._id

   // 2) Create dir for main img
   const dirPath = `public/img/${modelName}/${id}`
   try {
      await checkAndCreateDir(dirPath)
   } catch (e) {
      await item.remove()
      return next(new AppError(`Error during dir check: ${e.message}`, 500))
   }

   // 3) Write main photo(450px width) and back photo (full width)
   const backPhotoName = `back-${modelName}-${id}.jpg`
   const mainPhotoName = `main-${modelName}-${id}.jpg`

   // * If error during photo write delete db document and dir for photos
   try {
      await resizeAndWritePhoto(file, path.join(dirPath, backPhotoName))
      await resizeAndWritePhoto(file, path.join(dirPath, mainPhotoName), 300)
   } catch(e) {
      deleteDir(`public/img/${modelName}/${id}`)
      await item.remove()

      return next(new AppError(`Error during main photo writing: ${e.message}`, 500))
   }

   item.mainPhoto = `${dirPath}/${mainPhotoName}`
   item.backPhoto = `${dirPath}/${backPhotoName}`
}


exports.checkExistence = collection => catchAsync(async (req, res, next) => {
   console.log(req.params.id)
   const itemExists = await collection.findById(req.params.id).select('_id').lean().count()
   console.log(itemExists)
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

   await updateMainPhotoAndBack(
      req.file.buffer,
      modelName,
      item,
      next
   )

   // 4) Save item
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
   const data = req.body.data ? JSON.parse(req.body.data) : ''
   const item = await collection.findByIdAndUpdate(
      id,
      data,
      { runValidators: true, new: true }
   )

   // 2) Update main photo
   if (req.file) {
      await updateMainPhotoAndBack(
         req.file.buffer,
         modelName,
         item,
         next
      )
   }

   res.status(200).json({
      ok: true,
      statusText: 'OK',
      message: `${modelName} was successfully updated.`,
   })
})

exports.createOne = collection => catchAsync(async (req, res, next) => {
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

   const absPhotoPaths = item.getAbsPhotoPaths(req.get('host'))

   item.content = absPhotoPaths.content
   item.mainPhoto = absPhotoPaths.mainPhoto
   item.backPhoto = absPhotoPaths.backPhoto

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

   deleteDir([
      'public/img',
      modelName.toLowerCase(),
      req.params.id
   ].join('/')
   )

   res.status(204).json()
})