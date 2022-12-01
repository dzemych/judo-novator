const {model} = require('mongoose')
const BaseArticleSchema = require('./base.model')
const {formatImgSrcToRelative, getAbsPhotoPaths} = require('../utils/formatContent')


const blogSchema = new BaseArticleSchema({
   subTitle: String,
   text: String,
   date: Date,
})

blogSchema.methods.getAbsPhotoPaths = getAbsPhotoPaths

blogSchema.pre('save', formatImgSrcToRelative)

blogSchema.pre('save', function(next) {
   if (this.isNew)
      this.date = new Date()

   next()
})


module.exports = model('Blog', blogSchema)