const {model} = require('mongoose')
const BaseArticleSchema = require("../baseArticle.shema")


const albumSchema = new BaseArticleSchema({
   description: String
})

albumSchema.remove('content')

module.exports = model('Album', albumSchema)