const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const APIfeatures = require('../utils/APIfeatures')
const {
   deleteDir,
   updateMainPhotoAndBack
} = require('../utils/photoUtils')
const ObjectId = require('mongoose').Types.ObjectId


exports.checkUniqueSlug = collection => catchAsync(async (req, res, next) => {
   const is = await collection.findOne({ slug: req.params.slug }).select('_id').lean().count()
   if (is)
      return next(new AppError('This slug is not unique', 422))

   res.json({
      ok: true,
      message: 'This slug is unique',
      slug: req.params.slug
   })
})

exports.checkExistence = collection => catchAsync(async (req, res, next) => {
   const id = req.params.id
   // ObjectId.isValid not working correctly with certain slugs
   const isId = ObjectId.isValid(id) && id.split('-').length < 2

   const itemExists = await collection
      .findOne(isId ? { _id: id } : { slug: id })
      .select('_id')
      .lean()
      .count()

   if (!itemExists)
      return next(new AppError('No item.tsx exists with such id', 404))

   next()
})

exports.createOneWithFormData = collection => catchAsync(async (req, res, next) => {
   if (!req.body.data)
      return next(new AppError('Put all necessary fields in data field', 400))

   // 1) Create item.tsx from data field in request
   const data = JSON.parse(req.body.data)
   const item = await collection.create(data)

   const modelName = item.constructor.modelName.toLowerCase()

   // 2) Write proper main and back photo paths
   await updateMainPhotoAndBack(
      req.file.buffer,
      modelName,
      item,
      next
   )

   res.status(201).json({
      ok: true,
      statusText: 'OK',
      message: `${modelName} successfully created`,
      item: { _id: item._id, slug: item.slug }
   })
})

exports.updateOneWithFormData = collection => catchAsync(async (req, res, next) => {
   const id = req.params.id
   // ObjectId.isValid not working correctly with certain slugs
   const isId = ObjectId.isValid(id) && id.split('-').length < 2

   const modelName = collection.collection.collectionName
      .split('').slice(0, -1).join('')

   // 1) Update document in database
   const data = req.body.data ? JSON.parse(req.body.data) : ''
   const item = await collection.findOne(isId ? { _id: id } : { slug: id })

   Object.keys(data).forEach(key => {
      item[key] = data[key]
   })

   await item.save({ new: true })

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
      item
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
   const data = await features.query
   const collectionLength = await collection.count()

   res.json({
      status: 'success',
      message: 'Data successfully received',
      results: data.length,
      colLength: collectionLength,
      items: data
   })
})

exports.getOne = collection => catchAsync(async (req, res, next) => {
   const id = req.params.id
   // ObjectId.isValid not working correctly with certain slugs
   const isId = ObjectId.isValid(id) && id.split('-').length < 2

   const item = await collection
      .findOne(isId ? { _id: id } : { slug: id })

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
      return next(new AppError('No item.tsx found with that id', 404))

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