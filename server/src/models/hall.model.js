const {model} = require('mongoose')
const BaseArticleSchema = require("./baseArticle.model");


const hallSchema = new BaseArticleSchema({
   address: String
})

hallSchema.remove('content')

module.exports = model('Hall', hallSchema)