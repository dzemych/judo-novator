const {model, Schema} = require('mongoose')


const teamSchema = new Schema({
   photos: [String],
   mainPhoto: String,
   backgroundPhoto: String,
   name: String,
   position: String,
   description: String,
   tel: String,
   email: String,
   instagram: String,
   telegram: String,
   facebook: String
})


module.exports = model('Team', teamSchema)