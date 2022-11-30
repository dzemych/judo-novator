const {model, Schema} = require('mongoose')


const blogSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   subTitle: String,
   text: String,
   date: Date,
   mainPhoto: String,
   backgroundPhoto: String,
   content: String
})

blogSchema.methods.formatContent = function(folderName) {
   const rgx = /^(http|https)\/\//
   // const arr = this.content.split('/').map(el => {
   //    console.log(el)
   // })
}

blogSchema.pre('save', function(next) {
   if (this.isNew)
      this.date = new Date()

   next()
})

module.exports = model('Blog', blogSchema)