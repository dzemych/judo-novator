const {Schema, model} = require('mongoose')


const albumSchema = new Schema({
   title: String,
   mainPhoto: String,
   backgroundPhoto: String,
   photos: [String]
})


module.exports = model('AlbumList', albumSchema)