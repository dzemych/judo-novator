const {model} = require('mongoose')
const BaseArticleSchema = require("./base.model");
const {formatImgSrcToRelative, getAbsPhotoPaths} = require("../utils/formatContent");


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

eventSchema.methods.getAbsPhotoPaths = getAbsPhotoPaths

eventSchema.pre('save', formatImgSrcToRelative)

module.exports = model('Event', eventSchema)