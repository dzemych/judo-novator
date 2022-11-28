const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')


exports.uploadTempImg = catchAsync(async (req, res, next) => {
   console.log(req)
   console.log('///////////////')
   console.log(req.file)
   console.log(req.params.folderId)
})