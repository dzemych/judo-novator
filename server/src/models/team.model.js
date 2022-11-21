const {model, Schema} = require('mongoose')
const LanguageSchema = require('./languages.schema')


const teamSchema = new Schema({
   photos: [String],
   mainPhoto: String,
   backgroundPhoto: String,
   name: LanguageSchema,
   position: LanguageSchema,
   description: LanguageSchema,
   tel: String,
   email: String,
   instagram: String,
   telegram: String,
   facebook: String
})


module.exports = model('Team', teamSchema)