const {model, ObjectId} = require('mongoose')
const BaseArticleSchema = require("./baseArticle.model");


const hallSchema = new BaseArticleSchema({
   address: String,
   location: {
      // GeoJSON
      type: {
         type: String,
         default: "Point",
         enum: ["Point"]
      },
      coordinates: [Number]
   },
   members: [ObjectId],
})

module.exports = model('Hall', hallSchema)