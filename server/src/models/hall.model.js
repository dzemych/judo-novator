const {model, ObjectId} = require('mongoose')
const BaseArticleSchema = require("./base.model");
const {formatImgSrcToRelative, getAbsPhotoPaths} = require("../utils/formatContent");


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

hallSchema.methods.getAbsPhotoPaths = getAbsPhotoPaths

hallSchema.pre('save', formatImgSrcToRelative)

module.exports = model('Hall', hallSchema)