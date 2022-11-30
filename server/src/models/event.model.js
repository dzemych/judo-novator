const {model, Schema} = require('mongoose')


const eventSchema = new Schema({
   photo: String,
   title: String,
   address: String,
   text: String,
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