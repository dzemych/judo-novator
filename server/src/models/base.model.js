const {Schema} = require('mongoose')
const util = require("util");
const slugify = require('slugify')


function BaseArticleSchema() {
   Schema.apply(this, arguments)

   this.add({
      title      : {
         type    : String,
         required: true
      },
      content    : {
         type    : String,
         required: true
      },
      slug       : {
         type   : String,
         default: function () {
            return slugify(this.title, {lower: true})
         }
      },
      photos: [String],
      mainPhoto  : String,
      backPhoto  : String,
      beforeTitle: String,
      afterTitle : String,
      text       : String,
      date       : Date
   })
}

util.inherits(BaseArticleSchema, Schema)

module.exports = BaseArticleSchema