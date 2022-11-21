const User = require('../models/user.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
const Email = require('../utils/email')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const createJwt = email => {
   return jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '60d'
   })
}

exports.checkPasswordBeforeUpdate = catchAsync(async (req, res, next) => {
   // 1) Check if necessary fields are provided
   if (!req.body.oldPassword)
      return next(new AppError('Provide old password', 409))

   // 2) Check if there is such user
   const user = await User.findById(req.params.id).select('+password').lean()
   if (!user)
      return next(new AppError('No user with that email', 404))

   // 3) Password check
   const pwdCheck = await bcrypt.compare(req.body.oldPassword, user.password)
   if (!pwdCheck)
      return next(new AppError('Invalid old password', 401))

   next()
})

exports.forgotPassword = catchAsync(async (req, res, next) => {
   const email = req.body.email
   if (!email)
      return next(new AppError('Provide user email', 400))

   // 1) Check if there is user with such email
   const user = await User.findOne({ email })
   if (!user)
      return next(new AppError('No user found with such email', 404))

   // 2) Create and get reset password token
   const resetHash = await user.createResetToken()

   // 3) Send reset password mail
   await new Email(
      email,
      'http://localhost:5000/api/auth/resetPassword/' + resetHash
   ).sendReset()

   res.json({
      ok: true,
      message: 'Reset password link was sent to email'
   })
})

exports.resetPassword = catchAsync(async (req, res, next) => {
   const { token, password, passwordConfirm } = req.body

   if (!token || !password || !passwordConfirm)
      return next(new AppError('Provide token, password and passwordConfirm', 400))

   // 1) Get encrypted token that is stored in db from req hash
   const resetToken = crypto.createHash('sha256').update(req.body.token).digest('hex')

   // 2) Find user with this token
   const user = await User.findOne({ resetToken: resetToken })

   if (!user)
      return next(new AppError('Invalid confirm token', 403))

   // 3) If token is outdated return error
   const createdAt = new Date(user.resetTokenCreated).getTime()

   if ((createdAt + 2 * 60 * 60 * 1000) < Date.now())
      return next(new AppError('Expired token, please reset password again', 403))

   // 4) Change password and clear token
   user.password = password
   user.passwordConfirm = passwordConfirm
   user.resetToken = undefined
   user.resetTokenCreated = undefined

   await user.save()

   res.json({
      ok: true,
      message: 'Password has been changed, now log in with the new password'
   })
})

exports.createUser = catchAsync(async (req, res, next) => {
   // 1) Create new user and create hash
   const user = await User.create(req.body)

   // * If first user you get root role and active true
   if (!user.active) {
      const createHash = await user.createCreateHash()

      // 2) Send hash to admin email
      await new Email(
         user.email,
         'http://localhost:5000/api/auth/confirmAcc/' + createHash
      ).sendConfirm()
   }

   res.status(201).json({
      ok: true,
      message: 'User was created successfully, now your profile have to be confirmed by admin'
   })
})

exports.confirmAccount = catchAsync(async (req, res, next) => {
   // 1) Get encrypted token that is stored in db from req hash
   const confirmToken = crypto.createHash('sha256').update(req.body.token).digest('hex')

   // 2) Find user with this token
   const user = await User.findOne({ createToken: confirmToken }).select('+active')

   if (!user)
      return next(new AppError('Invalid confirm token', 403))

   // 3) Set user to active
   user.active = true
   user.createToken = undefined

   await user.save({ validateBeforeSave: false })

   res.json({
      ok: true,
      message: 'User account successfully confirmed'
   })
})

exports.login = catchAsync(async (req, res, next) => {
   const { email, password } = req.body

   // 1) Check if necessary fields are provided
   if (!email || !password)
      return next(new AppError('Provide both email and password', 400))

   // 2) Check if there is such user
   const user = await User.findOne({ email }).select('password').lean()

   if (!user)
      return next(new AppError('Invalid email or password', 404))

   // 3) Check password
   const pwdCheck = await bcrypt.compare(password, user.password)

   if (!pwdCheck)
      return next(new AppError('Invalid email or password', 400))

   // 4) If everything ok create and send token to client
   const token = createJwt(email)

   res.json({
      ok: true,
      message: 'Logged in successfully',
      token
   })
})

exports.protectAndSetId = catchAsync(async (req, res, next) => {
   const auth = req.headers.authorization

   // 1) Check if client provided authorization header
   if (!auth)
      return next(new AppError('Provide authorization header with Bearer [token]', 401))

   // 2) Verify token
   const token = auth.split(' ')[1]
   const verify = jwt.verify(token, process.env.JWT_SECRET)

   // 3) Check if user exists with such email
   const user = await User.findOne({ email: verify.email })

   if (!user)
      return next(new AppError('Invalid token', 403))

   // 4) Check if password hasn't been changed after token creation
   if (verify.iat * 1000 < user.passwordChanged)
      return next(new AppError('Password has been changed after token creation', 403))

   req.userId = user._id
   req.role = user.role

   next()
})

exports.restrictTo = roles => catchAsync(async (req, res, next) => {
   if (!req.role)
      return next(new AppError('Before restrict middleware must be protect', 500))

   if (!roles.includes(req.role))
      return next(new AppError('You are not allowed to do this action', 403))

   next()
})

exports.setIdAsParams = catchAsync(async (req, res, next) => {
   if (!req.userId)
      return next(new AppError('To set an id as params, provide it', 400))

   req.params.id = req.userId
   next()
})