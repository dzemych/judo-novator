const {model} = require('mongoose')
const BaseArticleSchema = require("./base.model");
const {formatImgSrcToRelative, getAbsPhotoPaths} = require("../utils/formatContent");


const albumSchema = new BaseArticleSchema()

albumSchema.methods.getAbsPhotoPaths = getAbsPhotoPaths

albumSchema.pre('save', formatImgSrcToRelative)


module.exports = model('Album', albumSchema)