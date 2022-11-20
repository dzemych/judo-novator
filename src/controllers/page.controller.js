const AppError = require('../utils/AppError')
const catchAsync = require('../utils/catchAsync')


exports.handlePages = catchAsync(async (req, res, next) => {
   console.log(req.protocol)
   next()
})