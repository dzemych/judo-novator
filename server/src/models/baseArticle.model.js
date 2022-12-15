const {Schema} = require('mongoose')
const util = require("util");
const slugify = require('slugify')
const {checkAndCreateDir, writeAndGetPhotos} = require("../utils/photoUtils");


const getAbsPath = (dir) => {
   const relDir = dir.split('/').slice(1).join('/')
   return `http://${curHost}:5000/${relDir}`
}

const processNewPhotos = function (val, srcArr, modelName) {
   if (srcArr.length < 1) {
      return val
   } else {
      let newVal = val

      // 1) Get relative paths and photo names
      const relativePaths = srcArr.map(el => el.split('/').slice(-4))

      // 2) Write photos to proper dirs
      checkAndCreateDir(`public/img/${modelName}/${this._id}`)

      const photos = writeAndGetPhotos(relativePaths, this._id.toString(), modelName)

      // 3) Change content srcs with relative paths
      srcArr.forEach((el, i) => {
         newVal = newVal.replace(el, photos[i])
      })

      this.photos = photos
      return newVal
   }
}

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
               newVal = processNewPhotos.apply(this, [val, srcArr, modelName])
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

               newVal = processNewPhotos.apply(this, [val, newPhotos, modelName])
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