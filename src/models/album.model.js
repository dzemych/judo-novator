const {Schema, model} = require('mongoose')
const LanguageSchema = require('./languages.schema')


const albumSchema = new Schema({
   title: LanguageSchema,
   mainPhoto: String,
   backgroundPhoto: String,
   photos: [String]
})


module.exports = model('Album', albumSchema)