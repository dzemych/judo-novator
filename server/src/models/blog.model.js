const {model, Schema} = require('mongoose')
const LanguageSchema = require('./languages.schema')


const blogSchema = new Schema({
   title: LanguageSchema,
   subTitle: LanguageSchema,
   text: LanguageSchema,
   date: Date,
   mainPhoto: String,
   backgroundPhoto: String,
   photos: [String]
})

blogSchema.pre('save', function(next) {
   if (this.isNew)
      this.date = new Date()

   next()
})

module.exports = model('Blog', blogSchema)