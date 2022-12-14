const {model} = require('mongoose')
const BaseArticleSchema = require("./baseArticle.model");


const albumSchema = new BaseArticleSchema()


module.exports = model('Album', albumSchema)