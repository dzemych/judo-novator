const {model} = require('mongoose')
const BaseArticleSchema = require('./baseArticle.model')


const blogSchema = new BaseArticleSchema()

module.exports = model('Blog', blogSchema)