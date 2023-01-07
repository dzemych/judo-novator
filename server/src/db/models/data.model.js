const {model, Schema} = require('mongoose')
const contentPath = require('../content.path')
const {getAbsPath} = require("../../utils/photoUtils");


const dataSchema = new Schema({
   _id: {
      type: String,
      required: true
   },
   location: {
      type: [Number, Number],
      default: undefined
   },
   mainPhoto: {
      type: String,
      get: (val) => {
         return val ? getAbsPath(val) : undefined
      },
      default: undefined
   },
   backPhoto: {
      type: String,
      get: (val) => {
         return val ? getAbsPath(val) : undefined
      },
      default: undefined
   },
   ...[Schema.Types.Mixed]
}, {
   id: false,
   strict: false,
   toJSON: { getters: true },
   toObject: { getters: true }
})

dataSchema.add(contentPath(false))

module.exports = model('Data', dataSchema)