const {Schema} = require('mongoose')
const util = require("util");
const slugify = require('slugify')
const { getAbsPath, processNewTempPhotos} = require("../utils/photoUtils");


function BaseArticleSchema() {
   Schema.apply(this, arguments)

   // 1) Add schema paths
   this.add({
      title      : {
         type    : String,
         required: true,
         unique  : true,
         set: function (val) {
            this.slug = slugify(val, {lower: true})

            return val
         }
      },
      content    : {
         type    : String,
         required: true,
         // For some reason cannot take out set to separate function,
         // probably because set cannot work with callbacks
         set: function (val) {
            let newVal = val

            const modelName = this.collection.collectionName
               .split('').slice(0, -1).join('')

            // * Regex for img src
            const srcRegex = /(http|https):\/\/.{3,30}\/img\/temp.*\.(jpg|jpeg|png|gif)/gi

            // 1) Get array of img srcs
            const elArr = val.replace(/([<>])/g, "|").split("|")
            const srcArr = elArr.reduce((acc, el) => {
               const str = el.match(srcRegex)

               if (str)
                  acc.push(str[0])

               return acc
            }, [])

            // If saving fresh document
            if (this.isNew) {
               newVal = processNewTempPhotos.apply(this, [val, srcArr, modelName])
               // If changing old content
            } else {
               // Replace all already existing photo srcs with relative paths
               const newPhotos = this.photos.reduce((acc, el) => {
                  const idx = srcArr.findIndex(src => src.includes(el))

                  if (idx) {
                     // Replace abs path in content with relative
                     val.replace(this.photos[idx], el)
                     acc.splice(idx, 1)
                  }

                  return acc
               }, srcArr)

               newVal = processNewTempPhotos.apply(this, [val, newPhotos, modelName])
            }

            return newVal
         },
         get: function (val) {
            let newContent = val

            if (val)
               this.photos.forEach(el => {
                  newContent = newContent.replace(el, getAbsPath(el))
               })

            return newContent
         }
      },
      slug       : {
         type   : String,
         unique: true,
         default: function () {
            return slugify(this.title, {lower: true})
         }
      },
      photos     : [String],
      mainPhoto  : {
         type: String,
         get : getAbsPath
      },
      backPhoto  : {
         type: String,
         get : getAbsPath
      },
      beforeTitle: String,
      afterTitle : String,
      text       : String,
      date       : Date,
      createdAt  : {
         type: Date,
         default: function() {
            return new Date()
         }
      }
   })

   // 2) Set schema options
   this.set('toObject', {getters: true})
   // For some reason1 getters on json won't work any way (json I mean when you use .lean())
   this.set('toJSON', {getters: true})
}

util.inherits(BaseArticleSchema, Schema)

module.exports = BaseArticleSchema