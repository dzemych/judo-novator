const {model, Schema} = require('mongoose')
const slugify = require("slugify");
const {getAbsPath} = require("../../utils/photoUtils");


const teamSchema = new Schema({
   mainPhoto  : {
      type: String,
      get : getAbsPath
   },
   backPhoto  : {
      type: String,
      get : getAbsPath
   },
   name: {
      type: String,
      required: true
   },
   surname: {
      type: String,
      required: true
   },
   slug       : {
      type   : String,
      unique: true,
      default: function () {
         return slugify(`${this.surname}-${this.name}`, {lower: true})
      }
   },
   position: {
      type: String,
      required: true
   },
   description: String,
   tel: String,
   email: String,
   birth: {
      type: Date,
      set: function(val) {
         return val === 0 ? undefined : val
      }
   },
   positionType: {
      type: String,
      enum: ['worker', 'sportsman'],
      default: 'sportsman'
   },
   mediaLinks: {
      instagram: String,
      telegram: String,
      facebook: String,
      viber: String,
   }
}, {
   toObject : {getters: true, setters: true},
   toJSON : {getters: true, setters: true}
})

teamSchema.index({ name: 1, surname: 1 }, { unique: true })

module.exports = model('Team', teamSchema)