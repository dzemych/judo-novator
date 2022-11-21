const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const APIfeatures = require('../utils/APIfeatures')
const {
   checkPhotoDirExist,
   deleteDir,
   deletePhotoFiles,
   writeAndGetPhotos
} = require('../utils/photoUtils')


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
   const item = await collection.create(JSON.parse(req.body.data))
   const modelName = item.constructor.modelName

   // 2) Check if we have all necessary directories for photo
   await checkPhotoDirExist(modelName.toLowerCase(), item._id)

   // 3) Write and resize photos and get their paths
   const photoObj = await writeAndGetPhotos(req.files, item._id, modelName.toLowerCase())

   // 4) Save photo paths to db
   Object.keys(photoObj).forEach(photoKey => {
      item[photoKey] = photoObj[photoKey]
   })

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
      await checkPhotoDirExist(modelName, id)

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

exports.createOne = collection => catchAsync(async (req, res) => {
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