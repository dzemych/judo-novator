const { Schema, model } = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')
const AppError = require('../utils/AppError')


const userSchema = new Schema({
   email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: val => validator.isEmail(val),
        message: 'Invalid email'
      }
   },
   password: {
      type: String,
      required: true,
      select: false
   },
   passwordConfirm: String,
   passwordChanged: Date,
   role: {
      type: String,
      enum: ['admin', 'root'],
      default: 'admin'
   },
   createToken: String,
   resetToken: String,
   resetTokenCreated: Date,
   active: {
      type: Boolean,
      default: false,
      select: false
   }
})


userSchema.methods.createResetToken = async function() {
   const resetHash = crypto.randomBytes(32).toString('hex')

   this.resetToken = crypto
      .createHash('sha256')
      .update(resetHash)
      .digest('hex')
   this.resetTokenCreated = new Date()

   await this.save({ validateBeforeSave: false })

   return resetHash
}

userSchema.methods.createCreateHash = async function() {
   const createHash = crypto.randomBytes(32).toString('hex')

   this.createToken = crypto
      .createHash('sha256')
      .update(createHash)
      .digest('hex')

   await this.save({ validateBeforeSave: false })

   return createHash
}

userSchema.pre(/^save/i, async function (next) {
   // 1) If new user set activate link to admin email
   if (this.isNew)
      this.active = false

   // 2) If you are first user active is true
   const count = await this.constructor.count()
   if (!count) {
      this.active = true
      this.role = 'root'
   }

   // 3) Hash check if passwords are the same and hash them
   if (this.isModified('password') || this.isNew) {
      if (this.passwordConfirm !== this.password)
         next(new AppError('Password and password confirm are not the same', 400))

      this.passwordChanged = Date.now() - 1000
      this.password = await bcryptjs.hash(this.password, 12)

      this.passwordConfirm = undefined
   }

   next()
})

userSchema.pre(/^find/, function(next) {
   if (!this._conditions.hasOwnProperty('createToken'))
      this.find({ active: true })

   next()
})


module.exports = model('User', userSchema)