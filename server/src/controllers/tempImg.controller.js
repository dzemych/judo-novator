const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const multer = require("multer");
const photoUtils = require("../utils/photoUtils");


const upload = multer({
   fileFilter: photoUtils.multerFilter,
   storage: multer.memoryStorage()
})

exports.uploadMulter = upload.single('upload')

exports.uploadTempImg = catchAsync(async (req, res, next) => {
   console.log(req)
   console.log(req.file)
})