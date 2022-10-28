const {model, Schema, ObjectId} = require('mongoose')
const LanguageSchema = require('./languages.schema')


const hallSchema = new Schema({
   photos: [String],
   mainPhoto: String,
   backgroundPhoto: String,
   title: LanguageSchema,
   address: LanguageSchema,
   text: LanguageSchema,
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