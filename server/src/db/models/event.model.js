const {model} = require('mongoose')
const BaseArticleSchema = require("../baseArticle.shema");


const eventSchema = new BaseArticleSchema({
   address: String,
   startDate: Date,
   endDate: Date,
   location: {
      // GeoJSON
      type: {
         type: String,
         default: "Point",
         enum: ["Point"]
      },
      coordinates: [Number]
   },
})

module.exports = model('Event', eventSchema)