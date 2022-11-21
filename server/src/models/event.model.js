const {model, Schema} = require('mongoose')
const LanguageSchema = require('./languages.schema')


const eventSchema = new Schema({
   photo: String,
   title: LanguageSchema,
   address: LanguageSchema,
   text: LanguageSchema,
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


module.exports = model('Schema', eventSchema)