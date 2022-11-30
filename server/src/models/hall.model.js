const {model, Schema, ObjectId} = require('mongoose')


const hallSchema = new Schema({
   photos: [String],
   mainPhoto: String,
   backgroundPhoto: String,
   title: String,
   address: String,
   text: String,
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