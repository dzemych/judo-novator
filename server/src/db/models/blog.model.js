const {model} = require('mongoose')
const BaseArticleSchema = require('../baseArticle.shema')


const blogSchema = new BaseArticleSchema()

module.exports = model('Blog', blogSchema)